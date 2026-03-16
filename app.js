const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');                // ← add this
const { PrismaClient } = require('@prisma/client');
const secure = require('./src/middleware/secure');
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));    // ← add this
app.use(secure);                     

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Agro Rent Backend API' });
});

// Add your routes here

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});