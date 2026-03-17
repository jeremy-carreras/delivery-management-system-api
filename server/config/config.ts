import * as dotenv from 'dotenv';
import 'colors';

let result: any = {};

try {
  result = dotenv.config();
  if (result.error) throw result.error;
  console.log(('El archivo .env se cargado correctamente.'.underline.bold as any).cyan);
} catch (err) {
  console.log(('El archivo .env no se cargo.'.underline.bold as any).red);
}
