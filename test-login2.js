const fetch = require('node-fetch');
async function test() {
  console.log('1. Fetch users to get a user ID to test update');
  let res = await fetch('http://localhost:4000/users', {
    method: 'GET', headers: {'Content-Type': 'application/json'}
  });
  const data = await res.json();
  const testuser = data.data.find(u => u.username !== 'admin');
  if (!testuser) return console.log('No user found');
  const userId = testuser.id;
  console.log('Testing with user:', testuser.username);

  console.log('\n2. Updating password to newpassword123');
  res = await fetch('http://localhost:4000/users/' + userId, {
    method: 'PUT', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: testuser.username, password: 'newpassword123'})
  });
  console.log('Update res:', await res.json());

  console.log('\n3. Trying to login with NEW password');
  res = await fetch('http://localhost:4000/login', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: testuser.username, password: 'newpassword123'})
  });
  console.log('Login res:', await res.json());
}
test();
