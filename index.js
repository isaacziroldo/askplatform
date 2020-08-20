const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const connection = require('./database/database')

const Pergunta = require('./database/askDb')

const Resposta = require('./database/AnswerDb')

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

            Resposta.findAll({
                where:{askId:pergunta.id},
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('answer',{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })

            
        }else{
            res.render('/')
        }
    })
})

app.post('/responder', (req,res)=>{
    let corpo = req.body.body
    let perguntaId = req.body.answer

    Resposta.create({
        body: corpo,
        askId: perguntaId
    }).then(()=>{
        res.redirect('/pergunta/' + perguntaId)
    })

})

app.listen(4001,()=>{
    console.log('App rodando')
})