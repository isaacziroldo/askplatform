const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')

const Pergunta = require('./database/askDb')

//Database
connection
    .authenticate()
    .then(()=>{
        console.log('Conectado com sucesso com o banco de dados!')
    })
    .catch((msgError)=>{
        console.log(msgError)
    })

//Dizendo para o express que está usando o EJS
app.set('view engine', 'ejs') 
app.use(express.static('public'))

//bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROUTES
app.get('/', (req,res) =>{
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        })
    })
    
})

app.get('/perguntar',(req,res)=>{

    res.render("ask")
})

app.post('/salvarpergunta', (req,res)=>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    
    Pergunta.create({
        title: titulo,
        description: descricao
    }).then(()=>{
        res.redirect('/')
    })
})

app.get('/pergunta/:id',(req,res)=>{
    let id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta !=undefined){
            res.render('answer',{
                pergunta: pergunta
            })
        }else{
            res.render('/')
        }
    })
})

app.listen(4001,()=>{
    console.log('App rodando')
})