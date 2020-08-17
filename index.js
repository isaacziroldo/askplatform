const express = require('express')
const app = express()

app.set('view engine', 'ejs') //Dizendo para o express que está usando o EJS
app.use(express.static('public'))

app.get('/', (req,res) =>{

    res.render("index")
})

app.get('/perguntar',(req,res)=>{

    res.render("ask")
})

app.listen(4001,()=>{
    console.log('App rodando')
})