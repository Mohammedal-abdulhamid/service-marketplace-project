const express = require('express');
const cors = require('cors')
require('dotenv').config();

const {connectDB, sequelize } = require('./config/db');
const app =express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();
        await sequelize.sync();
        app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
    } catch (error) {
        console.error('unable to start server', error.message)
    }
};

startServer();
