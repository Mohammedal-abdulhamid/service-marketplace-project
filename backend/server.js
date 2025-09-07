const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes'); 
const servicesRoutes = require('./routes/servicesRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/services', servicesRoutes);
app.get('/', (req, res) => {
    res.send('Server is running!');
  });

const PORT = process.env.PORT || 4000;




  

const startServer = async () => {
    try {
        await connectDB();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error('Unable to start server', error.message);
    }
};

startServer();
