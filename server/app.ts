import './config/config';
import 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import routes from './routes';
import { setQrCallback, getLatestQrPng } from './services/whatsapp';

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

// Live QR page — auto-refreshes every 5 seconds
app.get('/qr', (req: Request, res: Response) => {
  const png = getLatestQrPng();
  if (!png) {
    return res.send('<h2 style="font-family:sans-serif;text-align:center;margin-top:20vh">WhatsApp ya está conectado ✅ o el QR aún no ha generado. Espera unos segundos y recarga.</h2>');
  }
  const b64 = png.toString('base64');
  res.send(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="5"><title>WhatsApp QR</title><style>body{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#111;font-family:sans-serif;color:#fff}img{width:300px;border-radius:16px;box-shadow:0 0 40px #0f0}p{margin-top:16px;font-size:14px;opacity:.7}</style></head><body><h2>Escanea con WhatsApp</h2><img src="data:image/png;base64,${b64}"><p>Esta página se actualiza automáticamente cada 5 segundos.</p></body></html>`);
});

app.get('/qr.png', (req: Request, res: Response) => {
  const png = getLatestQrPng();
  if (!png) return res.status(404).send('No QR available');
  res.setHeader('Content-Type', 'image/png');
  res.send(png);
});

app.use(routes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(
    `API corriendo en el puerto: ${PORT}`.rainbow +
    `\nSwagger UI: http://localhost:${PORT}/api-docs`.cyan
  );
});
