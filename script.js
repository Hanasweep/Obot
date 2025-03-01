let chatData = {};

// Muat data percakapan dari JSON
fetch("chat_data.json")
    .then(response => response.json())
    .then(data => chatData = data)
    .catch(error => console.error("Gagal memuat percakapan:", error));

// Fungsi menangani input chat
function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    let userInput = document.getElementById("user-input").value.toLowerCase().trim();
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");

    // Tampilkan pesan pengguna
    let userMsg = `<div><strong>Anda:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMsg;

    // Respon chatbot berdasarkan JSON
    let botResponse = chatData[userInput] || "Maaf, saya tidak mengerti.";
    let botMsg = `<div><strong>Bot:</strong> ${botResponse}</div>`;

    setTimeout(() => {
        chatBox.innerHTML += botMsg;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    document.getElementById("user-input").value = "";
}