const dotenv = require('dotenv');
const colors = require('colors');
let result = {};

try {
  result = dotenv.config();
  if (result.error) throw result.error;
  console.log('El archivo .env se cargado correctamente.'.underline.bold.cyan);
} catch (err) {
  console.log('El archivo .env no se cargo.'.underline.bold.red);
}
