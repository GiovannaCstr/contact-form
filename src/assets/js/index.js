const form = document.getElementById('form');
const nome = document.getElementById('name');
const email = document.getElementById('email');
const mensagem = document.getElementById('mensagem');
const radios = document.getElementsByName('assunto');
const botaoEnviar = document.getElementById('botao-enviar');
const labelRadios = document.querySelectorAll('.botoes-mensagem');

atualizarBotaoEnviar();

// Verificar se todos os campos estão preenchidos
let radioSelecionadoAnterior = null; 
let assuntoSelecionado = '';

function verificarCamposPreenchidos() {
    var todosPreenchidos = true;

    if (nome.value === '' || email.value === '' || mensagem.value === '') {
        todosPreenchidos = false;
    }

    var radioSelecionado = false;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            radioSelecionado = true;
            radios[i].parentNode.classList.add("botoes-mensagem--ativo");
        
            if (radioSelecionadoAnterior !== radios[i]) {
                if (radioSelecionadoAnterior !== null) {
                    radioSelecionadoAnterior.parentNode.classList.remove("botoes-mensagem--ativo");
                }
            radioSelecionadoAnterior = radios[i];
            radioSelecionadoAnterior.parentNode.classList.add("botoes-mensagem--ativo");
            }
            assuntoSelecionado = radios[i].value;
            break;
        }
    }
    return todosPreenchidos && radioSelecionado && assuntoSelecionado;
}

// Habilitar e desabilitar o botão de enviar
function atualizarBotaoEnviar() {
    if (verificarCamposPreenchidos()) {
        botaoEnviar.disabled = false;
        botaoEnviar.classList.remove("botao-enviar--desativado");
    } else {
        botaoEnviar.disabled = true;
        botaoEnviar.classList.add("botao-enviar--desativado");
    }
}

// Adiciona os eventlistener para os inputs e o radio
nome.addEventListener('input', atualizarBotaoEnviar);
email.addEventListener('input', atualizarBotaoEnviar);
mensagem.addEventListener('input', atualizarBotaoEnviar);
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', atualizarBotaoEnviar);
}

// Salvar a Mensagem no Local Storage
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nomeValido = validarNome(nome);
    const emailValido = validarEmail(email);
    const mensagemValida = validarMensagem(mensagem);

    if(nomeValido && emailValido && mensagemValida){
        const objetoFinal = {
            name: nome.value,
            email: email.value,
            mensagem: mensagem.value,
            assunto: verificarCamposPreenchidos(assuntoSelecionado)
            }
        
        let arrayMensagem = [];
        if(localStorage.hasOwnProperty('mensagem')){
            arrayMensagem = JSON.parse(localStorage.getItem('mensagem'));            
        }               
        arrayMensagem.push(objetoFinal);
        localStorage.setItem('mensagem', JSON.stringify(arrayMensagem));
        
        nome.value = "";
        email.value = "";
        mensagem.value = "";
    }
});

//Validar os campos nome, email e mensagem
function validarNome(nome){
    const spanErro = document.getElementById('erro-nome');
    const regexNome = /\w+\s+\w+/;
    
    if(regexNome.test(nome.value)){
        spanErro.style.visibility = 'hidden';
        return true;
    }else {
        spanErro.style.visibility = 'visible';
        return false;
    }
}

function validarEmail(email){
    const spanErro = document.getElementById('erro-email');
    const emailRegex = /^([\w]\.?)+@([\w]+\.)+([A-Za-z]{2,4})+$/;

    if(emailRegex.test(email.value)){
        spanErro.style.visibility = 'hidden';
        return true;
    }else {
        spanErro.style.visibility = 'visible';
        return false;
    }
}

function validarMensagem(mensagem){
    const spanErro = document.getElementById('erro-mensagem');
    const mensagemRegex = /^(?=(\S+\s*){20})[\p{L}\s]*\S[\p{L}\s]*$/u;

    if(mensagemRegex.test(mensagem.value)){
        spanErro.style.visibility = 'hidden';
        return true;
    }else {
        spanErro.style.visibility = 'visible';
        return false;
    }
}

