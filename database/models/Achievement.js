const { Model, DataTypes } = require('sequelize');
const sequelize = require('../databaseInit');

class Achievement extends Model {}

Achievement.init(
    
    {  
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
            primaryKey: false
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        xp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        playedGame: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'GLOBAL'
        },
        wins: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        drows: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        loses: {
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, 
    
    {
        sequelize,              
        modelName: 'Achievements'
    }
)

module.exports = Achievement;