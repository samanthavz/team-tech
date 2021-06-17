const form = document.getElementById('send-container');
const chatMessages = document.getElementById('messages')

const socket = io();

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg)

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    const li = document.createElement('li');
    li.innerHTML = `<p>${message.timeNow} </p>
    <p class="text">
        ${message.msg}
    </p>`
    chatMessages.appendChild(li);
}