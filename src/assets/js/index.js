const form = document.getElementById('form');
const interests = document.querySelectorAll('#assunto');
const botaoEnviar = document.getElementById('botao-enviar');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('mensagem');


//Variables to recevied the error
let nameError = true;
let emailError = true;
let messageError = true;
let interestsError = true;


interests.forEach((interest) => {
    interest.addEventListener("click", function(){
        const parentElement = interest.parentNode;
        toggleSelection(parentElement);
        checkInterests(); 
    })
})

//coloca e tira a classe dos botoes
function toggleSelection(element) {
    element.classList.toggle('selected');
}

//Validate name, email, message and interests fields
function checkInterests() { 
    const selectedInterests = document.querySelectorAll('.interesses.selected');
    if(selectedInterests.length > 0){
        interestsError = false;
    }
}

nameInput.addEventListener("input", function(){
    checkName();
})

emailInput.addEventListener("input", function(){
    checkEmail();
})

messageInput.addEventListener("input", function(){
    checkMessage();
})

function checkName(){
    const spanError = document.getElementById('erro-nome');
    const regexName = /\w+\s+\w+/;
    
    if(regexName.test(nameInput.value)){
        nameError = false;
        spanError.style.visibility = 'hidden';
    }else if (nameInput.value == ""){
        nameError = true;
        spanError.style.visibility = 'hidden';
    } else {
        nameError = true;
        spanError.style.visibility = 'visible';
    }
}

function checkEmail(){
    const spanError = document.getElementById('erro-email');
    const emailRegex = /^([\w]\.?)+@([\w]+\.)+([A-Za-z]{2,4})+$/;
    
    if(emailRegex.test(emailInput.value)){
        emailError = false;
        spanError.style.visibility = 'hidden';
    }else if (emailInput.value == ""){
        emailError = true;
        spanError.style.visibility = 'hidden';
    } else {
        emailError = true;
        spanError.style.visibility = 'visible';
    }
}

function checkMessage(){
    const spanError = document.getElementById('erro-mensagem');
    const messageRegex = /^(?=(\S+\s*){20})[\p{L}\s]*\S[\p{L}\s]*$/u;

    if(messageRegex.test(messageInput.value)){
        messageError = false;
        spanError.style.visibility = 'hidden';
    }else if (messageInput.value == ""){
        messageError = true;
        spanError.style.visibility = 'hidden';
    } else {
        messageError = true;
        spanError.style.visibility = 'visible';
    }
}

enableButton();

form.addEventListener("input", function(){
    enableButton();
})

form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveToLocalStorage();
    window.location.href = "messages.html";
})



function enableButton() {
    if (!interestsError && !nameError && !emailError && !messageError){
        botaoEnviar.disable = false;
        botaoEnviar.classList.remove('botao-enviar--desativado');
    }else {
        botaoEnviar.disable = true;
        botaoEnviar.classList.add('botao-enviar--desativado');
    }
}

function saveToLocalStorage() {
    const selectedInterests = document.querySelectorAll('.interesses.selected');

    const arrayInterests = [];
    arrayInterests.push(selectedInterests);
    
    const messageSent = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value, 
        interests: arrayInterests
    }

    localStorage.setItem('messageData', JSON.stringify(messageSent));
}