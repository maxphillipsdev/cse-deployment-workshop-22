import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI is not defined');
}

const client = new MongoClient(process.env.MONGODB_URI);

async function connect() {
  await client.connect();
  console.log('Connected to MongoDB');
}

export { client, connect };
