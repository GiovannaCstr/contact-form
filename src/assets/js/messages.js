const btnBack = document.getElementById('back');
const section = document.getElementById('messages-section');
const savedMessages = JSON.parse(localStorage.getItem('messageData'));

btnBack.addEventListener("click", function(){
    window.location.href = "index.html";
})

savedMessages.forEach((messages) => {
    const { name, email, message, interests } = messages;

    const messagesDiv = document.createElement("div");
    messagesDiv.classList.add('messages-div');    

    const interestsDiv = document.createElement("div");
    interestsDiv.classList.add('interests-div');

    interests.forEach((interest) => {
      const interestsParagraph = document.createElement("article");
      interestsParagraph.classList.add('messages-interests');
      interestsParagraph.textContent = interest;
      interestsDiv.appendChild(interestsParagraph);
    })

    const messageText = document.createElement("div");
    messageText.classList.add('messages-text');

    const messageParagraph = document.createElement("p");
    messageParagraph.textContent = message;
    messageText.appendChild(messageParagraph);

    const messageInfos = document.createElement("div");
    messageInfos.classList.add('messages-infos');

    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = "Nome: " + name;
    const emailParagraph = document.createElement("p");
    emailParagraph.textContent = "Email: " + email;

    messageInfos.appendChild(nameParagraph);
    messageInfos.appendChild(emailParagraph);

    messagesDiv.appendChild(interestsDiv);
    messagesDiv.appendChild(messageText);
    messagesDiv.appendChild(messageInfos);
    section.appendChild(messagesDiv);

})

