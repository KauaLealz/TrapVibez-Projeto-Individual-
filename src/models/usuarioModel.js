var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = sha2('${senha}', 256);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', sha2('${senha}', 256));
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificaremail(email) {
    var instrucao = `SELECT * FROM usuario WHERE email = '${email}'`;
    console.log("Executando verificação de e-mail: \n" + instrucao);
    return database.executar(instrucao);
}

function inserirDadosQuiz(acertos, erros, idUser) {
    var instrucao = `
    insert into quiz (acertos, erros, fkUsuario) values
    (${acertos}, ${erros}, ${idUser})
    ;
`;
    console.log("Executando inserção dos dados do quiz: \n");
    return database.executar(instrucao);
}

function receberDadosQuiz(idUsuario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `  SELECT 
        SUM(q.acertos) AS acertos,
        SUM(q.erros) AS erros
    FROM quiz q
    WHERE q.fkUsuario = ${idUsuario}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `  SELECT 
        SUM(q.acertos) AS acertos,
        SUM(q.erros) AS erros
    FROM quiz q
    WHERE q.fkUsuario = ${idUsuario}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function receberDadosRanking() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT u.nome AS nome_usuario, MAX(q.acertos) AS maior_acerto
        FROM quiz q
        JOIN usuario u ON q.fkUsuario = u.idUsuario
        GROUP BY u.nome;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT u.nome AS nome_usuario, MAX(q.acertos) AS maior_acerto
        FROM quiz q
        JOIN usuario u ON q.fkUsuario = u.idUsuario
        GROUP BY u.nome;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function postarNoticia(desc, link, img, dia, mes, ano) {
    var instrucao = `
    INSERT INTO noticia (descricao, link, img, dia, mes, ano) VALUES ('${desc}', '${link}', '${img}', '${dia}', '${mes}', '${ano}')
    ;
`;
    console.log("Executando inserção da notícia: \n");
    return database.executar(instrucao);
}

function obterNoticias() {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `SELECT *FROM noticia;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `SELECT *FROM noticia;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    verificaremail,
    inserirDadosQuiz,
    receberDadosRanking,
    receberDadosQuiz,
    postarNoticia,
    obterNoticias
};