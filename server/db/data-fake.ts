require('../config/config');
const colors = require('colors');
const { randomUUID } = require('crypto');

const User = require('./tablas/User');
const Category = require('./tablas/Category');
const Product = require('./tablas/Product');
const BakeryFlavor = require('./tablas/BakeryFlavor');
const BreadType = require('./tablas/BreadType');

const seed = async () => {
  console.log(('\nInsertando datos iniciales...'.bold as any).blue);

  // Users
  const adminId = randomUUID();
  const user1Id = randomUUID();
  const user2Id = randomUUID();

  await User.bulkCreate([
    { id: adminId, username: 'admin', password_hash: 'admin', role: 'admin', phone: '555-0000', name: 'Admin User' },
    { id: user1Id, username: 'user1', password_hash: 'user1', role: 'user', phone: '555-1111', name: 'Test User 1' },
    { id: user2Id, username: 'user2', password_hash: 'user2', role: 'user', phone: '555-2222', name: 'Test User 2' },
  ], { ignoreDuplicates: true });
  console.log('Usuarios insertados.'.green);

  // Categories
  const grocId = randomUUID();
  const pharmId = randomUUID();
  const bakeryId = randomUUID();

  await Category.bulkCreate([
    { id: grocId,   name: 'Groceries', type: 'Normal' },
    { id: pharmId,  name: 'Pharmacy',  type: 'Normal' },
    { id: bakeryId, name: 'Bakery',    type: 'Custom' },
  ], { ignoreDuplicates: true });
  console.log('Categorías insertadas.'.green);

  // Products
  await Product.bulkCreate([
    {
      id: '1', name: 'Organic Hass Avocado', price: 4.50, unit: '2 units',
      category_id: grocId,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDU-Jlnm6aztSYxdyIqtXyyqCOjtFkLG71XXZvaK7q_T_h7n_DbCTtwLHf8v_Hbv1daQ9j_ThJZjoBQ5UUqkFdscblOPUktGbGv8b06ifFTb-oU4ugMEeCKGyjELgAxmsvzemj98UNcb1q9dndZrT7EYvNlwEJLX0airixOQ2FqeoWtEWcx3dzck1mn5EQsa315lkC78nfqXXFjgRLVOwCbUapmxqI79HMXOA4NvObmyIpjYfQPQlo3oZtYIjAIdBzV_VdvsdOd4w',
    },
    {
      id: '2', name: 'Sourdough Loaf', price: 3.20, unit: '400g',
      category_id: bakeryId,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkTdT-pAMkwM8OTHHfBf5c8U6GhxD5Yr8zsflMG2IgJazeri94VCCeX7gi7O8p9B4K4Dq0oEueOXjowfaWjZUibz7kasj0OCv41voeiQOgLWzMEVMB6PGfTJvSHxDZ8RSmpT9zmqIrOuXy6g_RW-oxu1u0OgSTdZ3G7pEOB-aki3or5aRQRizzIHZoJlPdMq1QLvrtwWddZz3ad-FZEA4pW5WPSq3iz5rmmjhN5ZUSB7DPm4ot5ewWLSyJxTfvwWN5U7SkGpS6Lg',
    },
    {
      id: '3', name: 'Sweet Strawberries', price: 5.90, unit: '250g',
      category_id: grocId,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ8cQPwJC0OeW9oA93bONVcleQJaImPvLqj4JeftHvBUHK-JsUNuACWtrQNevhOzVbPFkegfY9QcQL89Z7BlGcwcnij3zyB3R8aRvkTG32MtGAH1RKdrhbKY0rGvSoaOX5Ruvj3LfCoRaCRZR1UJpIBaxP4jBJ9oA641KJ9HhYWCSlckIYyb4Bq1JrXvyKk5KVJvGSGv-_zTdkB08M7-fRwai-i629NwzileIeMsmvKBhg2r50UTUQtXpTFfa6cwgnuK0q6hGi0A',
    },
    {
      id: '4', name: 'Whole Farm Milk', price: 2.10, unit: '1L',
      category_id: grocId,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTO_EYWacbGVqIongeM_Mf7lzzWvDl93l3Qt788HvRBE6tCojmQmqUELH8IUuMXqE-GdmpDCaKa-Y2mWKwGhoWD8RzXsRbWPCjLn9JAgP_rozdptJIvvnoa9LyasNjNzROIqILf1d9Hl4nT9BXQPz7WlHD3czjQ3uLHc_iJ8PwkkLc5PyJMQnxgtNFQB6ahVCV-hivGi5kJV6Amn_NwCMTIjxQIxNn4EinxlU1ymSm6QxGiKCdTGq4y0BqZ9eOVsBTDnzdXOXU-Q',
    },
  ], { ignoreDuplicates: true });
  console.log('Productos insertados.'.green);

  // Bakery Flavors
  await BakeryFlavor.bulkCreate([
    { name: 'Chocolate' },
    { name: 'Vanilla' },
    { name: 'Strawberry' },
    { name: 'Caramel' },
    { name: 'Blueberry' },
  ], { ignoreDuplicates: true });
  console.log('Sabores insertados.'.green);

  // Bread Types
  await BreadType.bulkCreate([
    { name: 'White' },
    { name: 'Whole Wheat' },
    { name: 'Sourdough' },
    { name: 'Gluten-Free' },
  ], { ignoreDuplicates: true });
  console.log('Tipos de pan insertados.'.green);

  console.log(('\nDatos iniciales insertados correctamente.\n'.underline.bold as any).green);
  process.exit();
}

try {
  seed();
} catch (error) {
  console.log(error);
}

export {};
