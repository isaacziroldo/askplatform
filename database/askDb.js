const Sequelize = require('sequelize')

const connection = require('./database')

const Pergunta = connection.define('ask',{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Pergunta.sync({force: false}).then(()=>{
//     console.log('Tabela Criada com sucesso')
// })

module.exports = Pergunta