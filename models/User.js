const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric:true,
        },
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [8],
        },
    }
},{
    sequelize,
    underscored:true,
    modelName: 'user'
});

module.exports = User
