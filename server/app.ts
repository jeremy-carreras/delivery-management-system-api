import './config/config';
import 'colors';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import routes from './routes';

const app: Application = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

app.use(routes);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(
    `API corriendo en el puerto: ${PORT}`.rainbow +
    `\nSwagger UI: http://localhost:${PORT}/api-docs`.cyan
  );
});
