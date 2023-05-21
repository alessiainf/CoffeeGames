const { Model, DataTypes } = require('sequelize');
const sequelize = require('../databaseInit');

class User extends Model {}

User.init(
    
    {   
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            defaultValue: 'guest',
            allowNull: false
        },
        resetResponse: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        resetQuestion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        background: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
    }, 
    
    {
        sequelize,              
        modelName: 'Users'
    }
)

module.exports = User;