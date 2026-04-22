require('../config/config');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const { randomUUID } = require('crypto');

// Los modelos usan export default → necesitamos .default al hacer require
const User         = require('./tablas/User').default;
const Category     = require('./tablas/Category').default;
const Product      = require('./tablas/Product').default;
const Order        = require('./tablas/Order').default;
const OrderItem    = require('./tablas/OrderItem').default;
const BakeryFlavor = require('./tablas/BakeryFlavor').default;
const BreadType    = require('./tablas/BreadType').default;

// ──────────────────────────────────────────────────────────
//  CONFIGURA AQUÍ LAS CREDENCIALES DEL ADMIN
// ──────────────────────────────────────────────────────────
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Admin2024!';
const ADMIN_NAME     = 'Administrador';
const ADMIN_PHONE    = '000-0000';

const ok   = (msg: string) => console.log(colors.green('  ✔ ' + msg));
const warn = (msg: string) => console.log(colors.yellow('  ⚠ ' + msg));

const install = async () => {
  console.log(colors.bold(colors.blue('\n[1/3] Creando tablas (alter)...')));

  await User.sync({ alter: true });         ok('users');
  await Category.sync({ alter: true });     ok('categories');
  await Product.sync({ alter: true });      ok('products');
  await Order.sync({ alter: true });        ok('orders');
  await OrderItem.sync({ alter: true });    ok('order_items');
  await BakeryFlavor.sync({ alter: true }); ok('bakery_flavors');
  await BreadType.sync({ alter: true });    ok('bread_types');
};

const seed = async () => {
  console.log(colors.bold(colors.blue('\n[2/3] Insertando datos de catálogo...')));

  // ── Usuario Admin ──────────────────────────────────────
  const existingAdmin = await User.findOne({ where: { username: ADMIN_USERNAME } });
  if (existingAdmin) {
    warn('El usuario admin ya existe, se omite.');
  } else {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10);
    const password_hash = await bcrypt.hash(ADMIN_PASSWORD, salt);
    await User.create({
      id: randomUUID(),
      username: ADMIN_USERNAME,
      password_hash,
      role: 'admin',
      phone: ADMIN_PHONE,
      name: ADMIN_NAME,
    });
    ok(`Usuario admin creado  (username: ${ADMIN_USERNAME} / password: ${ADMIN_PASSWORD})`);
  }

  // ── Categorías ─────────────────────────────────────────
  const categories = [
    { name: 'Panadería',  type: 'Custom' },
    { name: 'Repostería', type: 'Normal' },
    { name: 'Bebidas',    type: 'Normal' },
    { name: 'Desayunos',  type: 'Normal' },
  ];

  const catIds: Record<string, string> = {};
  for (const cat of categories) {
    // Buscar primero para reutilizar el id existente
    let inst = await Category.findOne({ where: { name: cat.name } });
    let created = false;
    if (!inst) {
      inst = await Category.create({ id: randomUUID(), ...cat });
      created = true;
    }
    catIds[cat.name] = inst.id;
    ok(`Categoría "${cat.name}" ${created ? 'creada' : 'ya existía'}`);
  }

  // ── Sabores de panadería ───────────────────────────────
  const flavors = ['Natural', 'Chocolate', 'Vainilla', 'Fresa', 'Canela', 'Coco', 'Nuez'];
  for (const name of flavors) {
    const exists = await BakeryFlavor.findOne({ where: { name } });
    if (!exists) { await BakeryFlavor.create({ name }); ok(`Sabor "${name}" creado`); }
    else { ok(`Sabor "${name}" ya existía`); }
  }

  // ── Tipos de pan ───────────────────────────────────────
  const breadTypes = ['Blanco', 'Integral', 'Centeno', 'Sin Gluten', 'Brioche'];
  for (const name of breadTypes) {
    const exists = await BreadType.findOne({ where: { name } });
    if (!exists) { await BreadType.create({ name }); ok(`Tipo de pan "${name}" creado`); }
    else { ok(`Tipo de pan "${name}" ya existía`); }
  }

  // ── Productos del menú ─────────────────────────────────
  const products = [
    // Panadería
    { name: 'Pan Dulce Grande',        price: 15.00,  unit: '1 pieza',                 category_id: catIds['Panadería'],  is_available: true },
    { name: 'Concha',                  price: 12.00,  unit: '1 pieza',                 category_id: catIds['Panadería'],  is_available: true },
    { name: 'Cuerno',                  price: 10.00,  unit: '1 pieza',                 category_id: catIds['Panadería'],  is_available: true },
    { name: 'Dona Glaseada',           price: 18.00,  unit: '1 pieza',                 category_id: catIds['Panadería'],  is_available: true },
    // Repostería
    { name: 'Pastel de Chocolate',     price: 250.00, unit: '1 pastel (6 porciones)',  category_id: catIds['Repostería'], is_available: true },
    { name: 'Pastel de Vainilla',      price: 230.00, unit: '1 pastel (6 porciones)',  category_id: catIds['Repostería'], is_available: true },
    { name: 'Cupcake Surtido',         price: 35.00,  unit: '1 pieza',                 category_id: catIds['Repostería'], is_available: true },
    { name: 'Galletas de Avena',       price: 55.00,  unit: '12 piezas',               category_id: catIds['Repostería'], is_available: true },
    // Bebidas
    { name: 'Café Americano',          price: 30.00,  unit: '355 ml',                  category_id: catIds['Bebidas'],    is_available: true },
    { name: 'Café con Leche',          price: 38.00,  unit: '355 ml',                  category_id: catIds['Bebidas'],    is_available: true },
    { name: 'Chocolate Caliente',      price: 35.00,  unit: '355 ml',                  category_id: catIds['Bebidas'],    is_available: true },
    { name: 'Jugo de Naranja Natural', price: 42.00,  unit: '500 ml',                  category_id: catIds['Bebidas'],    is_available: true },
    // Desayunos
    { name: 'Desayuno Completo',       price: 120.00, unit: '1 orden',                 category_id: catIds['Desayunos'],  is_available: true },
    { name: 'Hotcakes (3 piezas)',     price: 85.00,  unit: '1 orden',                 category_id: catIds['Desayunos'],  is_available: true },
    { name: 'Chilaquiles Rojos',       price: 95.00,  unit: '1 orden',                 category_id: catIds['Desayunos'],  is_available: true },
  ];

  for (const prod of products) {
    const exists = await Product.findOne({ where: { name: prod.name } });
    if (!exists) { await Product.create({ id: randomUUID(), ...prod }); ok(`Producto "${prod.name}" creado`); }
    else { ok(`Producto "${prod.name}" ya existía`); }
  }
};

const exe = async () => {
  await install();
  await seed();
  console.log(colors.bold(colors.green('\n[3/3] ✅ Base de datos de producción ambientada correctamente.\n')));
  process.exit(0);
};

exe().catch((err: any) => {
  console.error(colors.red('❌ Error al ambientar la base de datos:'), err.message);
  if (err.errors) {
    err.errors.forEach((e: any) => console.error(' -', e.path, ':', e.message));
  }
  console.error(err.stack);
  process.exit(1);
});

export {};
