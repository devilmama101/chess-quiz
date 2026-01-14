var board = null
var game = new Chess()
var correctMoves = ['e4', 'c5'] // Example: Sicilian Defense
var currentStep = 0

function onDrop (source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' 
  })

  if (move === null) return 'snapback'

  // Check if move matches the "Flashcard" answer
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
  onDrop: onDrop
}
board = Chessboard('myBoard', config)
