const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');

const secure = require('./src/middleware/secure');
const { connectDB } = require('./src/config/prisma');
const routes = require('./src/routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(secure);

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Agro Rent Backend API' });
});

/* API Routes */
app.use('/api', routes);

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});