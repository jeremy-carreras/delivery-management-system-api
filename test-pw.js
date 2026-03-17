require('./server/config/config');
const User = require('./server/db/tablas/User').default;
async function run() {
  const user = await User.findOne({ where: { username: 'jeremy' } });
  console.log('toJSON():', user.toJSON());
  console.log('password_hash:', user.password_hash);
  console.log('getDataValue:', user.getDataValue('password_hash'));
  process.exit(0);
}
run();
