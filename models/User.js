const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt");

class User extends Model {}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric:true,
        },
        unique: true
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
    hooks:{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj;
        }
    }
});

module.exports = User
