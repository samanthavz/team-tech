const form = document.getElementById('send-container');
const chatMessages = document.getElementById('messages')

const socket = io();

socket.on('message', message => {
    console.log(message)
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
    // var time = new Date();
    // var timeNow = time.getHours() + `:` + (time.getMinutes()<10?'0':'') + time.getMinutes();
    const li = document.createElement('li');
    li.innerHTML = `
    <p class="text">
        ${message}
    </p>`
    chatMessages.appendChild(li);
}