const {Sequelize} = require('sequelize');
require ('dotenv').config();



const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env_DB_USER,
    process.env.DB_PASSWORD,
 { host: process.env.DB_HOST,
   dialect:'postgres',
   logging: false
}
);

const connectDB = async () => {
 try{
    await sequelize.authenticate();
    console.log("Database connected successfully")

 } catch (srror){
    console.log("unable to connect database")
 }
};

module.exports = {sequelize, connectDB}