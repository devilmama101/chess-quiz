var game = new Chess();
var board = null;
var moveFrom = null;

const openings = [
    { name: "Sicilian Defense", moves: ["e4", "c5"], why: "The Sicilian creates an unbalanced game where Black fights for the center with a wing pawn (c5). It's great for counter-attacking." },
    { name: "French Defense", moves: ["e4", "e6", "d4", "d5"], why: "Solid and reliable. You challenge the center with d5 while keeping a very sturdy pawn structure." },
    { name: "Caro-Kann Defense", moves: ["e4", "c6", "d4", "d5"], why: "Known as 'The Rock.' It's extremely hard for White to break through, and your endgame is usually better." },
    { name: "Ruy Lopez", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"], why: "Classic and high-level. White pressures the knight to indirectly control the center." },
    { name: "Italian Game", moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"], why: "Focuses on rapid piece development and attacks the weak f7 square early on." },
    { name: "Queen's Gambit", moves: ["d4", "d5", "c4"], why: "One of the most powerful openings for White. You exchange a wing pawn for total central dominance." },
    { name: "Scandinavian Defense", moves: ["e4", "d5"], why: "Directly challenges White's e4 pawn on move one. It forces the game into open lines immediately." },
    { name: "King's Indian Defense", moves: ["d4", "Nf6", "c4", "g6"], why: "A hypermodern favorite. You allow White to take the center so you can destroy it later with tactical strikes." },
    { name: "London System", moves: ["d4", "Nf6", "Bf4"], why: "A very consistent 'system' for White that is hard for Black to surprise. Very safe and solid." },
    { name: "Vienna Game", moves: ["e4", "e5", "Nc3"], why: "A tricky opening that avoids the most common lines and sets up sharp attacks on the Kingside." }
];

var currentOpening, currentStep;

function startNewQuiz() {
    currentOpening = openings[Math.floor(Math.random() * openings.length)];
    currentStep = 0;
    game.reset();
    board.position('start');
    removeHighlights();
    moveFrom = null;
    document.getElementById('opening-name').innerText = "Goal: " + currentOpening.name;
    document.getElementById('status').innerHTML = "Your move! (Drag or Click to move)";
    document.getElementById('hintBtn').style.display = 'inline-block';
}

function removeHighlights() {
    $('.square-55d63').removeClass('highlight-hint');
}

function showHint() {
    var nextMoveSan = currentOpening.moves[currentStep];
    var tempGame = new Chess(game.fen());
    var moveObj = tempGame.move(nextMoveSan);
    
    if (moveObj) {
        removeHighlights();
        $(`.square-${moveObj.from}`).addClass('highlight-hint');
        $(`.square-${moveObj.to}`).addClass('highlight-hint');
    }
}

function handleMove(source, target) {
    var move = game.move({ from: source, to: target, promotion: 'q' });

    if (move === null) {
        removeHighlights();
        return 'snapback';
    }

    if (move.san === currentOpening.moves[currentStep]) {
        currentStep++;
        board.position(game.fen());
        removeHighlights();
        
        if (currentStep === currentOpening.moves.length) {
            document.getElementById('status').innerHTML = 
                `<div style="color: #2ecc71; font-weight: bold; margin-bottom: 10px;">Success!</div>` +
                `<div style="font-size: 0.9rem; margin-bottom: 15px;">${currentOpening.why}</div>` +
                `<button onclick="startNewQuiz()" style="background-color: #e67e22;">Next Opening</button>`;
            document.getElementById('hintBtn').style.display = 'none';
        } else {
            document.getElementById('status').innerText = "Correct! Continue...";
        }
    } else {
        document.getElementById('status').innerText = "Not the " + currentOpening.name + " move. Try again!";
        game.undo();
        removeHighlights();
        return 'snapback';
    }
}

function onSquareClick(square) {
    if (moveFrom === null) {
        if (game.get(square)) {
            moveFrom = square;
            removeHighlights();
            $(`.square-${square}`).addClass('highlight-hint');
        }
    } else {
        var source = moveFrom;
        var target = square;
        moveFrom = null;
        handleMove(source, target);
    }
}

// THIS IS THE CONFIG SECTION
var config = {
    draggable: true,
    position: 'start',
    onDrop: handleMove,
    onSquareClick: onSquareClick,
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};

board = Chessboard('myBoard', config);
startNewQuiz();
$(window).resize(board.resize);
