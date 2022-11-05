import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';
import './db.js';

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

// Import the routes from routes.js
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
