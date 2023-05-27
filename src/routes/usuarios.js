var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/verificaremail", function(req,res){
    usuarioController.verificaremail(req,res);
})

router.post("/inserirDadosQuiz", function(req,res){
    usuarioController.inserirDadosQuiz(req,res);
})

router.get("/receber-dados-ranking", function(req,res){
    usuarioController.receberDadosRanking(req,res);
})

router.post("/receber-dados-quiz", function(req,res){
    usuarioController.receberDadosQuiz(req,res);
})

router.post("/postar-noticia", function(req,res){
    usuarioController.postarNoticia(req,res);
})

router.get("/receber-noticias", function(req,res){
    usuarioController.obterNoticias(req,res);
})

module.exports = router;