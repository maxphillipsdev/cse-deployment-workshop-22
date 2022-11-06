import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';
import { connect } from './db.js';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
const PORT = process.env.PORT || 3000;

async function run() {
  // Setup mongodb connection
  await connect();

  // Import the routes from routes.js
  app.use('/', router);

  app.listen(PORT);
}

run().then(() => {
  console.log(`Server is listening on port ${PORT}`);
});
