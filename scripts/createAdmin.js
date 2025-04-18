require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');
const { hash } = require('bcryptjs');

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('snap_and_trace');

  const existing = await db.collection('users').findOne({ email: 'admin@gmail.com' });
  if (existing) {
    console.log('Admin already exists');
    return;
  }

  const hashedPassword = await hash('123456', 10);

  const admin = {
    username: 'admin',
    email: 'admin@gmail.com',
    password: hashedPassword,
    role: 'admin',
  };

  await db.collection('users').insertOne(admin);
  console.log('✅ Admin created successfully!');
}

createAdmin().catch(console.error);
