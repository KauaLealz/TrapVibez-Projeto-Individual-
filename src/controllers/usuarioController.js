var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function verificaremail(req, res) {
    var email = req.body.emailServer;
  
    if (email == undefined) {
      res.status(400).send("O email está indefinido!");
    } else {
      usuarioModel
        .verificaremail(email)
        .then(function (resultado) {
          if (resultado.length > 0) {
            res.json({ emailCadastrado: true });
          } else {
            res.json({ emailCadastrado: false });
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao verificar o email! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
  }

function finalizar(req, res) {
    var valores = req.body.respostasServer
  
    if (valores == undefined) {
      res.status(400).send("O email está indefinido!");
    } else {
      usuarioModel
        .finalizar(valores)
        .then(function (resultado) {
          if (resultado.length > 0) {
            res.json({ respostas_enviadas: true });
          } else {
            res.json({ respostas_enviadas: false });
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao verificar o email! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
    }
}

function inserirDadosQuiz(req, res) {
    var acertos = req.body.acertosServer
    var erros = req.body.errosServer
    var idUser = req.body.idUserServer
  
      usuarioModel
        .inserirDadosQuiz(acertos, erros, idUser)
        .then(function (acertos, erros) {
          if (acertos != undefined && erros != undefined && idUser != undefined) {
            res.json({ respostas_recebidas: true });
          } else {
            res.json({ respostas_recebidas: false });
          }
        })
        .catch(function (erro) {
          console.log(erro);
          console.log(
            "\nHouver um erro ao receber as respostas: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        });
}

function receberDadosQuiz(req, res) {

  var idUsuario = req.body.idUsuarioServer

  console.log(`Recuperando medidas em tempo real`);

  usuarioModel.receberDadosQuiz(idUsuario).then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });

}

function receberDadosRanking(req, res) {

  console.log(`Recuperando medidas em tempo real`);

  usuarioModel.receberDadosRanking().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });

}

function obterNoticias(req, res) {

  console.log(`Recuperando medidas em tempo real`);

  usuarioModel.obterNoticias().then(function (resultado) {
      if (resultado.length > 0) {
          res.status(200).json(resultado);
      } else {
          res.status(204).send("Nenhum resultado encontrado!")
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });

}

function postarNoticia(req, res) {
  var desc = req.body.descricaoServer
  var link = req.body.linkServer
  var img = req.body.imgServer
  var dia = req.body.diaServer
  var mes =req.body.mesServer
  var ano = req.body.anoServer

    usuarioModel
      .postarNoticia(desc, link, img, dia, mes, ano)
      .then(function (desc) {
        if (desc != undefined) {
          res.json({ respostas_recebidas: true });
        } else {
          res.json({ respostas_recebidas: false });
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouver um erro ao receber as respostas: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
}
  
module.exports = {
    entrar,
    cadastrar,
    listar,
    testar,
    verificaremail,
    finalizar,
    inserirDadosQuiz,
    receberDadosRanking,
    receberDadosQuiz,
    postarNoticia,
    obterNoticias
}