require('../config/config');
const colors = require('colors');

const User = require('./tablas/User');
const Category = require('./tablas/Category');
const Product = require('./tablas/Product');
const Order = require('./tablas/Order');
const OrderItem = require('./tablas/OrderItem');
const BakeryFlavor = require('./tablas/BakeryFlavor');
const BreadType = require('./tablas/BreadType');

const drop = async () => {
  console.log(('\nPaso 1) Desinstalando la db.'.bold as any).blue);
  await OrderItem.drop();
  console.log('La tabla order_items se desinstaló correctamente.'.magenta);
  await Order.drop();
  console.log('La tabla orders se desinstaló correctamente.'.magenta);
  await Product.drop();
  console.log('La tabla products se desinstaló correctamente.'.magenta);
  await Category.drop();
  console.log('La tabla categories se desinstaló correctamente.'.magenta);
  await User.drop();
  console.log('La tabla users se desinstaló correctamente.'.magenta);
  await BakeryFlavor.drop();
  console.log('La tabla bakery_flavors se desinstaló correctamente.'.magenta);
  await BreadType.drop();
  console.log('La tabla bread_types se desinstaló correctamente.'.magenta);
};

const sync = async () => {
  console.log(('\nPaso 2) Instalando la db.'.bold as any).blue);
  await User.sync();
  console.log('La tabla users se instaló correctamente.'.magenta);
  await Category.sync();
  console.log('La tabla categories se instaló correctamente.'.magenta);
  await Product.sync();
  console.log('La tabla products se instaló correctamente.'.magenta);
  await Order.sync();
  console.log('La tabla orders se instaló correctamente.'.magenta);
  await OrderItem.sync();
  console.log('La tabla order_items se instaló correctamente.'.magenta);
  await BakeryFlavor.sync();
  console.log('La tabla bakery_flavors se instaló correctamente.'.magenta);
  await BreadType.sync();
  console.log('La tabla bread_types se instaló correctamente.'.magenta);
};

const exe = async () => {
  await drop();
  await sync();
  console.log(('\nSe ha instalado exitosamente la base de datos.\n'.underline.bold as any).green);

  process.exit();
};

try {
  exe();
} catch (error) {
  console.log(error);
}

export {};
