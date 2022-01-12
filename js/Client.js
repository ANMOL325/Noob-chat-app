const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.Container');
const Identity = document.getElementById("Identity");

const name2 = prompt("Enter your name to join");

Identity.innerText = `Profile:${name2} 👍`;
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = "";  
})

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('MessageRight');
    messageContainer.append(messageElement);
}
socket.emit('new-user-joined', name2);

socket.on('user-joined', name2 => {
append(`${name2} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})









