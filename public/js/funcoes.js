// sessão
function validarSessao() {
    // aguardar();

    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var id = sessionStorage.ID_USUARIO

    var nome_saudacao = document.getElementById("nome_saudacao");

    if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        nome_saudacao.innerHTML = nome;

        // finalizarAguardar();
    } else {
        window.location = "./public/login.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "./public/login.html";
}

function abrirPerfil() {
    var perfil = document.getElementById("perfilUser")

    if (perfil.style.display == 'none') {
        perfil.style.display = `flex`
    } else {
        perfil.style.display = 'none'
    }
}
