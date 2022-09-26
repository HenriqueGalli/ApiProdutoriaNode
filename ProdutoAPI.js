
const express = require("express")
const path = require('path')
const app = express()
   
var PORT = process.env.port || 3000
  
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")
  
app.get("/produtorio", function(req, res){
  
    var m = req.query.m
    var n = req.query.n
    var metodo = req.query.metodo

    var valorM = parseInt(m)
    var valorN = parseInt(n)
    var respostaFinal 
    if(metodo == "ITERATIVO"){
       respostaFinal = iterativoProdutorio(valorM,valorN)
    }else if(metodo == "RECURSIVO"){
        respostaFinal = recursivoProdutorio(valorM,valorN, 1)
    }
    
    res.json({
        resposta: respostaFinal,
        metodo: metodo
    })
    
})
   
app.listen(PORT, function(error){
    if(error) throw error
    console.log("Server created Successfully on PORT", PORT)
})

function recursivoProdutorio(m,n,resposta){
    var valorIterar = m
    var valorResposta = resposta
    valorResposta = valorResposta * (valorIterar + (1/valorIterar))
    valorIterar++
    if(n>=valorIterar){
        return recursivoProdutorio(valorIterar,n, valorResposta)
    }
    return valorResposta
    
}

function iterativoProdutorio(m,n){
    var resposta = 1

    for (var i = m; i <= n; i++) {
        resposta = resposta * (i + (1/i))
    }
    console.log("resposta:", resposta)
    return resposta
}