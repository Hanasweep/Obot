let chatData = { responses: {}, synonyms: {} };
let chatHistory = [];
let gameState = null;
let targetNumber = null;
let tebakKataJawaban = null;
let tebakKataPetunjuk = "";

// **Muat data percakapan dari JSON**
fetch("chat_data.json")
    .then(response => response.json())
    .then(data => chatData = data)
    .catch(error => console.error("Gagal memuat percakapan:", error));

// **Menangani input saat tekan Enter**
function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

// **Mengirim pesan dan memproses respons**
function sendMessage() {
    let userInput = document.getElementById("user-input").value.trim().toLowerCase();
    if (!userInput) return;

    let chatBox = document.getElementById("chat-box");

    // **Tampilkan pesan pengguna**
    chatBox.innerHTML += `<div><strong>Anda:</strong> ${userInput}</div>`;
    chatHistory.push(userInput);

    let response = processUserInput(userInput);

    setTimeout(() => {
        chatBox.innerHTML += `<div><strong>Bot:</strong> ${response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    document.getElementById("user-input").value = "";
}

// **Proses input pengguna dan game logic**
function processUserInput(userInput) {
    // **Gunakan sinonim jika ada**
    let normalizedInput = chatData.synonyms[userInput] || userInput;

    // **Jika sedang dalam mode game**
    if (gameState === "tebak angka") {
        let guess = parseInt(userInput);
        if (!isNaN(guess)) {
            if (guess === targetNumber) {
                gameState = null;
                return `Benar! Angka saya adalah ${targetNumber}. Mau main lagi?`;
            } else if (guess < targetNumber) {
                return "Terlalu kecil! Coba lagi.";
            } else {
                return "Terlalu besar! Coba lagi.";
            }
        }
        return "Masukkan angka antara 1-10.";
    }

    if (gameState === "suit") {
        let choices = ["batu", "gunting", "kertas"];
        if (!choices.includes(userInput)) {
            return "Pilih batu, gunting, atau kertas!";
        }
        let botChoice = choices[Math.floor(Math.random() * 3)];
        if (userInput === botChoice) {
            return `Saya pilih ${botChoice}. Seri!`;
        } else if (
            (userInput === "batu" && botChoice === "gunting") ||
            (userInput === "gunting" && botChoice === "kertas") ||
            (userInput === "kertas" && botChoice === "batu")
        ) {
            return `Saya pilih ${botChoice}. Kamu menang!`;
        } else {
            return `Saya pilih ${botChoice}. Saya menang!`;
        }
    }

    if (gameState === "tebak kata") {
        if (userInput === tebakKataJawaban) {
            gameState = null;
            return `Benar! Jawabannya adalah ${tebakKataJawaban}. Mau main lagi?`;
        }
        return "Salah! Coba lagi.";
    }

    // **Cek apakah input ada dalam database chatbot**
    if (chatData.responses[normalizedInput]) {
        let responses = chatData.responses[normalizedInput];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // **Mulai game jika pengguna mengetik perintah game**
    if (userInput === "tebak angka") {
        gameState = "tebak angka";
        targetNumber = Math.floor(Math.random() * 10) + 1;
        return "Saya sudah memilih angka 1-10. Coba tebak!";
    }

    if (userInput === "suit") {
        gameState = "suit";
        return "Pilih: batu, gunting, atau kertas.";
    }

    if (userInput === "tebak kata") {
        gameState = "tebak kata";
        let kataList = [
            { kata: "apel", petunjuk: "Buah merah yang sering dimakan dokter" },
            { kata: "matahari", petunjuk: "Sumber cahaya alami terbesar di Bumi" },
            { kata: "kucing", petunjuk: "Hewan berbulu yang suka mengeong" }
        ];
        let randomKata = kataList[Math.floor(Math.random() * kataList.length)];
        tebakKataJawaban = randomKata.kata;
        tebakKataPetunjuk = randomKata.petunjuk;
        return `Petunjuk: ${tebakKataPetunjuk}`;
    }

    return "Saya tidak mengerti. Coba ketik 'main game' untuk melihat daftar permainan.";
}

const menuToggle = document.querySelector('.menu-toggle');
		const nav = document.querySelector('nav ul');
	  
		menuToggle.addEventListener('click', function(){
		  nav.classList.toggle('slide');
		});


        const playBtn = document.getElementById('play-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const audioPlayer = document.getElementById('audio-player');
        const trackName = document.getElementById('track-name');
        
        const songs = [
            { name: "Feast - Nina", file: "assets/music/nina.mp3"},
            { name: "The Night We Met", file: "assets/music/night.mp3"},
            { name: "New West - Those Eyes", file: "assets/music/newwest.mp3"},
            { name: "Gigi Perez - Sailor Song", file: "assets/music/sailor.mp3"},
            { name: "Billie Eilish - BIRDS OF A FEATHER", file: "assets/music/birds.mp3"},{ name: "Ed Sheeran - Photograph", file: "assets/music/photo.mp3"}
        ];
        
        let currentSongIndex = 0;
        
        function loadSong(songIndex) {
            const song = songs[songIndex];
            audioPlayer.src = song.file;
            trackName.textContent = song.name;
            audioPlayer.load();
        }
        
        function playPause() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playBtn.textContent = "Pause";
            } else {
                audioPlayer.pause();
                playBtn.textContent = "Play";
            }
        }
        
        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            audioPlayer.play();
            playBtn.textContent = "Pause";
        }
        
        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            audioPlayer.play();
            playBtn.textContent = "Pause";
        }
        
        playBtn.addEventListener('click', playPause);
        nextBtn.addEventListener('click', nextSong);
        prevBtn.addEventListener('click', prevSong);
        
        // Initial load
        loadSong(currentSongIndex);
        