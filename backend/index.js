import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/routes.js';
import { connect } from './db.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
const PORT = process.env.PORT || 8000;

async function run() {
  // Setup mongodb connection
  await connect();

  // Import the routes from routes.js
  app.use('/', router);

  // Register a health check endpoint
  app.get('/health', (req, res) => {
    res.send({
      status: 'OK',
      uptime: process.uptime(),
    });
  });

  app.listen(PORT);
}

run().then(() => {
  console.log(`Server is listening on port ${PORT}`);
});
