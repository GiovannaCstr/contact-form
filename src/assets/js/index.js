const form = document.getElementById('form');
const interests = document.querySelectorAll('#assunto');
const botaoEnviar = document.getElementById('botao-enviar');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('mensagem');
const arrayMessages = JSON.parse(localStorage.getItem("messageData")) || [];

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

function toggleSelection(element) {
    element.classList.toggle('selected');
}

function checkInterests() { 
    selectedInterests = document.querySelectorAll(".interesses.selected");
    if(selectedInterests.length > 0){
        interestsError = false;
    } else {
        interestsError = true;
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

function enableButton() {
    if (!interestsError && !nameError && !emailError && !messageError){
        botaoEnviar.disabled = false;
        botaoEnviar.classList.remove('botao-enviar--desativado');
    }else {
        botaoEnviar.disabled = true;
        botaoEnviar.classList.add('botao-enviar--desativado');
    }
}

function disableButton() {
    botaoEnviar.disabled = true;
    botaoEnviar.classList.add('botao-enviar--desativado');
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    saveToLocalStorage();

    interests.forEach((interest) => {
        const parentElement = interest.parentNode;
        parentElement.classList.remove('selected');
    })

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    disableButton();

    alert();
})


function saveToLocalStorage() {
    selectedInterests = document.querySelectorAll(".interesses.selected");
    
    const interests = [];
    for (const element of selectedInterests) {
        interests.push(element.outerText);
    }

    const messageSent = {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value, 
        interests: interests
    }

    arrayMessages.push(messageSent);
    localStorage.setItem("messageData", JSON.stringify(arrayMessages));
}

function alert() {
    Swal.fire({
        title: 'Message sent successfully',
        text: "Click to continue",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: 'var(--cor-destaque)',
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "messages.html";
        }
      })
    
}