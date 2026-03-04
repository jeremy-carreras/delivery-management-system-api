require('./config/config');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.redirect('/api-docs'));

app.use(require('./routes/index'));

app.listen(Number(process.env.PORT), () =>
  console.log(
    `API corriendo en el puerto: ${process.env.PORT}`.rainbow +
    `\nSwagger UI: http://localhost:${process.env.PORT}/api-docs`.cyan
  )
);

