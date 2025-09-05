const {dataType, DataTypes} = require('sequelize');
const{sequelize} = require('../config/db');
const User = require ('./User');

const Listing = sequelize.defin('Listing',{
    id:{type: DataTypes.INTEGER, primaryket: true, autoincrement: true},
    title : {type:DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.ENUM('service', 'request'), allowNull: false},
        
    
}, {

timestamps: true

})

Listing.belongsTo(User,{foreignKey: 'userId',onDelete: 'CASCADE'});
User.hasMany(Listing, { foreignKey: 'userId'});

module.exports = Listing;
