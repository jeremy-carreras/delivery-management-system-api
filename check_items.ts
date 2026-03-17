import sequelize from './server/config/sequelize.conf';
import OrderItem from './server/db/tablas/OrderItem';

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection established.');
    
    // Check for specific order
    const orderId = 'ORD-2026-92258'; // The newly created order to verify fix
    const items = await OrderItem.findAll({
      where: { order_id: orderId }
    });
    console.log(`Found ${items.length} items for ${orderId}:`);
    console.log(JSON.stringify(items, null, 2));

    // List last 10 items in table
    const allItems = await OrderItem.findAll({ 
      limit: 10,
      order: [['id', 'DESC']]
    });
    console.log(`Total items in table: ${await OrderItem.count()}`);
    console.log('Last 10 items saved:');
    console.log(JSON.stringify(allItems, null, 2));
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
