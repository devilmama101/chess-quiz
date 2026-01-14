// 1. Initialize the game logic
var game = new Chess();
var board = null;

// 2. Define the opening (White: e4, Black: c5)
var correctMoves = ['e4', 'c5'];
var currentStep = 0;

// 3. What happens when a piece is dropped
function onDrop(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    // If illegal move, snap back
    if (move === null) return 'snapback';

    // Check if it's the right move for the quiz
    if (move.san === correctMoves[currentStep]) {
        document.getElementById('status').innerText = "Correct! Now play the next move.";
        currentStep++;
    } else {
        document.getElementById('status').innerText = "Wrong move! Try again.";
        game.undo();
        return 'snapback';
    }
}

// 4. Board Configuration
var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    // This specific URL is the most reliable source for pieces
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
};

// 5. Render the board
board = Chessboard('myBoard', config);

// Adjust board size on window resize
$(window).resize(board.resize);
