import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connect() {
  await client.connect();
  console.log('Connected to MongoDB');
}

export { client, connect };
