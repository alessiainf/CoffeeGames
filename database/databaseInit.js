const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('databaseCG', 'dbRootUsr', 'pswRootUsr', {
    dialect: 'sqlite',
    storage: './database/databaseCG.sqlite', 
});

module.exports = sequelize;