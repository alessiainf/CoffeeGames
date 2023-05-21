const { Model, DataTypes } = require('sequelize');
const sequelize = require('../databaseInit');

class Contact extends Model {}

Contact.init(
    
    {   
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            primaryKey: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, 
    
    {
        sequelize,             
        modelName: 'Contacts'
    }
)

module.exports = Contact;