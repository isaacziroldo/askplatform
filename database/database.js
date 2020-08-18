const Sequelize = require('sequelize');

const connection = new Sequelize('ask-udemy','techdev','ilfr741852',{
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = connection