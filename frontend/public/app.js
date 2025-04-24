document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Fungsi untuk menambahkan pesan ke chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Fungsi untuk mengirim pesan
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message, true);
            socket.emit('chat message', message);
            messageInput.value = '';
        }
    }

    // Event listener untuk tombol kirim
    sendButton.addEventListener('click', sendMessage);

    // Event listener untuk tombol enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Event listener untuk menerima response dari server
    socket.on('chat response', (response) => {
        addMessage(response);
    });

    // Event listener untuk error
    socket.on('error', (error) => {
        addMessage(`Error: ${error}`);
    });

    // Event listener untuk koneksi
    socket.on('connect', () => {
        console.log('Connected to server');
    });

    // Event listener untuk disconnect
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
}); 