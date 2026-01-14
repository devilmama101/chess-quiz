var board = null
var game = new Chess()
var correctMoves = ['e4', 'c5'] // Sicilian Defense
var currentStep = 0

function onDrop (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' 
  })

  if (move === null) return 'snapback'

  // Check move
  if (move.san === correctMoves[currentStep]) {
      document.getElementById('status').innerText = "Correct!"
      currentStep++
  } else {
      document.getElementById('status').innerText = "Wrong move! Try again."
      game.undo()
      return 'snapback'
  }
}

var config = {
  draggable: true,
  position: 'start',
  onDrop: onDrop,
  // THIS LINE FIXES THE PIECES:
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png'
}

board = Chessboard('myBoard', config)
