const { Model, DataTypes } = require('sequelize');
const sequelize = require('../databaseInit');

class ResetQuestion extends Model {}

ResetQuestion.init(
    
    {   
        idQuestion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: false
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    
    {
        sequelize,              
        modelName: 'ResetQuestions'
    }
)

module.exports = ResetQuestion;