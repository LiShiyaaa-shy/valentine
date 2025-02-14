const startBtn = document.getElementById("startGame")
const photobtn = document.getElementById("btn_photocard")
const chocobtn = document.getElementById("btn_choco")
const usernameBtn = document.getElementById("nameInput")
const backBtn = document.getElementById("back")

const game = document.getElementById("game")
const photocard = document.getElementById("photocard")
const choco = document.getElementById("choco")
const login = document.getElementById("login")
const usernameText = document.getElementById("username")

const correctPassword = "180624";
let enteredPassword = "";
const passwordDisplay = document.getElementById("password-display");
const passwordButtons = document.getElementById("password-buttons");


function updateDisplay() {
    passwordDisplay.textContent = enteredPassword.padEnd(6, "●");
}

function addNumber(num) {
    if (enteredPassword.length < 6) {
        enteredPassword += num;
        updateDisplay();
    }
}

function checkPassword() {
    const errorMessage = document.getElementById("error-message");
    if (enteredPassword === correctPassword) {
        errorMessage.style.display = "none";
        game.style.display = "block";
        login.style.display = "none";
        usernameText.innerHTML = usernameBtn.value;
    } else {
        errorMessage.style.display = "block";
        enteredPassword = "";
        updateDisplay();
    }
}

startBtn.addEventListener("click", checkPassword);

const buttonLayout = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"];

buttonLayout.forEach(num => {
    const button = document.createElement("button");
    button.textContent = num;
    if (num === "⌫") {
        button.onclick = () => {
            enteredPassword = enteredPassword.slice(0, -1);
            updateDisplay();
        };
    } else if (num !== "") {
        button.onclick = () => addNumber(num);
    } else {
        button.style.visibility = "hidden";
    }
    passwordButtons.appendChild(button);
});

updateDisplay();

startBtn.addEventListener("click", function() {
    const errorMessage = document.getElementById("error-message");
    const username = usernameBtn.value.trim(); // Ambil nilai username dan hilangkan spasi

    // Reset pesan error setiap kali tombol diklik
    errorMessage.style.display = "block";

    // Cek apakah username kosong atau hanya berisi spasi
    if (!username) { 
        errorMessage.textContent = "Masukkan username terlebih dahulu!";
        game.style.display = "none";
        login.style.display = "block";
        return; // Hentikan proses (tetap di login)
    }

    // Cek password
    if (enteredPassword !== correctPassword) {
        errorMessage.textContent = "Password salah!";
        enteredPassword = "";
        updateDisplay();
        return; // Hentikan proses (tetap di login)
    }

    // Jika username diisi dan password benar, lanjut ke game
    errorMessage.style.display = "none";
    game.style.display = "block";
    login.style.display = "none";
    usernameText.innerHTML = username;
});


backBtn.addEventListener("click", function(){
    game.style.display = "none"
    login.style.display = "block"
})

photobtn.addEventListener("click", function(){
    login.style.display = "none"
    photocard.style.display = "block"
})

chocobtn.addEventListener("click", function(){
    login.style.display = "none"
    choco.style.display = "flex"
})


