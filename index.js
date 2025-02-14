const startButton = document.getElementById("startGame");
const nameInput = document.getElementById("nameInput");
const usernameDisplay = document.getElementById("username");
const canvas = document.getElementById("canvas");
const restartButton = document.getElementById("restart");
const status = document.getElementById("status");


canvas.width= "300"
canvas.height= "300"

const redImage = new Image()
redImage.src = "./assets/love red.jpg"
const choImage = new Image()
choImage.src = "./assets/love choco.jpg"

document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen yang dibutuhkan
    const startButton = document.getElementById("startGame");
    const nameInput = document.getElementById("nameInput");
    const usernameDisplay = document.getElementById("username");
    const canvas = document.getElementById("canvas");
    const restartButton = document.getElementById("restart");
    const status = document.getElementById("status");
    const chooseRedBtn = document.getElementById("chooseRed");
    const chooseChocoBtn = document.getElementById("chooseChoco");
    const chooseLoveDiv = document.getElementById("chooseLove");

    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    const redImage = new Image();
    redImage.src = "./assets/love red.jpg";
    const choImage = new Image();
    choImage.src = "./assets/love choco.jpg";

    // Inisialisasi permainan
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let currentPlayer = "X";
    let playerSymbol = "X";
    let botSymbol = "O";
    let gameOver = false;

    // Gambar papan permainan
    function drawBoard() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "royalblue";
        ctx.lineWidth = 3;

        for (let i = 1; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(i * 100, 0);
            ctx.lineTo(i * 100, 300);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * 100);
            ctx.lineTo(300, i * 100);
            ctx.stroke();
        }

        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === "X") {
                    ctx.drawImage(redImage, c * 100 + 10, r * 100 + 10, 80, 80);
                } else if (board[r][c] === "O") {
                    ctx.drawImage(choImage, c * 100 + 10, r * 100 + 10, 80, 80);
                }
            }
        }
    }

    // Cek pemenang
    function checkWinner() {
        const winningLines = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (let line of winningLines) {
            const [a, b, c] = line;
            if (
                board[a[0]][a[1]] &&
                board[a[0]][a[1]] === board[b[0]][b[1]] &&
                board[a[0]][a[1]] === board[c[0]][c[1]]
            ) {
                gameOver = true;
                status.textContent = `Pemain ${board[a[0]][a[1]] === "X" ? "❤️" : "🍫"} Menang! 🎉`;
                return;
            }
        }

        if (board.flat().every(cell => cell !== "")) {
            gameOver = true;
            status.textContent = "Permainan Seri! 🤝";
        }
    }

    // Bot memilih langkah secara acak
    function botMove() {
        if (gameOver) return;

        let emptyCells = [];
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === "") {
                    emptyCells.push([r, c]);
                }
            }
        }

        if (emptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * emptyCells.length);
            let [row, col] = emptyCells[randomIndex];
            board[row][col] = botSymbol;
            drawBoard();
            checkWinner();
            if (!gameOver) {
                status.textContent = `Giliran Pemain ${playerSymbol === "X" ? "❤️" : "🍫"}`;
            }
        }
    }

    // Pemain memilih Love Merah
    chooseRedBtn.addEventListener("click", function () {
        playerSymbol = "X";
        botSymbol = "O";
        startGame();
    });

    // Pemain memilih Love Coklat
    chooseChocoBtn.addEventListener("click", function () {
        playerSymbol = "O";
        botSymbol = "X";
        startGame();
    });

    // Fungsi untuk memulai permainan
    function startGame() {
        chooseLoveDiv.style.display = "none";
        gameOver = false;
        drawBoard();
        status.textContent = `Giliran Pemain ${playerSymbol === "X" ? "❤️" : "🍫"}`;
    }

    // Event klik pada canvas untuk pemain
    canvas.addEventListener("click", function (event) {
        if (gameOver) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const row = Math.floor(y / 100);
        const col = Math.floor(x / 100);

        if (board[row][col] === "") {
            board[row][col] = playerSymbol;
            drawBoard();
            checkWinner();
            if (!gameOver) {
                status.textContent = "Giliran Bot...";
                setTimeout(botMove, 500);
            }
        }
    });

    // Reset game
    restartButton.addEventListener("click", function () {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                board[r][c] = "";
            }
        }
        gameOver = false;
        currentPlayer = "X";
        status.textContent = `Giliran Pemain ${playerSymbol === "X" ? "❤️" : "🍫"}`;
        drawBoard();
    });

    // Inisialisasi papan permainan
    drawBoard();
});
