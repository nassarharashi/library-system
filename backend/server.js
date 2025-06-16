const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const regesterRoutes = require('./routes/regesterRoutes');
const loginRoutes = require('./routes/loginRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/regester', regesterRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
