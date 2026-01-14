var game = new Chess();
var board = null;

const openings = [
    { 
        name: "Sicilian Defense", 
        moves: ["e4", "c5"], 
        why: "The Sicilian is the most popular response to e4. By playing c5, you create an asymmetrical position that allows Black to fight for the center without the immediate symmetry of e5. It sets up a complex, aggressive game where Black often gets great counter-attacking chances."
    },
    { 
        name: "French Defense", 
        moves: ["e4", "e6", "d4", "d5"], 
        why: "The French is a solid, 'bulletproof' defense. You allow White a big center but immediately challenge it with d5. It sets up a closed game where you look to attack White's center from the sides later on."
    },
    { 
        name: "Caro-Kann Defense", 
        moves: ["e4", "c6", "d4", "d5"], 
        why: "Often called 'The Rock,' the Caro-Kann is extremely solid. Like the French, you challenge the center with d5, but your Light-Squared Bishop isn't trapped behind your pawns, making your endgame very strong."
    },
    { 
        name: "Ruy Lopez", 
        moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"], 
        why: "One of the oldest and most studied openings. By putting the Bishop on b5, White puts immediate pressure on the Knight defending the e5 pawn. It sets up long-term positional pressure and is a favorite of World Champions."
    },
    { 
        name: "Italian Game", 
        moves: ["e4", "e5", "Nf3", "Nc6", "Bc4"], 
        why: "A classic opening that develops pieces quickly. The Bishop on c4 eyes the weak f7 pawn (the weakest point in Black's camp). It's great for beginners because it focuses on rapid development and kingside castling."
    },
    { 
        name: "Queen's Gambit", 
        moves: ["d4", "d5", "c4"], 
        why: "White 'offers' a pawn to lure Black's d-pawn away from the center. It's not a true gambit because White can easily get the pawn back. It sets up total control of the center and very organized development."
    },
    { 
        name: "Scandinavian Defense", 
        moves: ["e4", "d5"], 
        why: "The most direct way to challenge White. You immediately force White to deal with the center. It's great for forcing White out of their prepared 'book' moves and into a game where every move matters early on."
    },
    { 
        name: "King's Indian Defense", 
        moves: ["d4", "Nf6", "c4", "g6"], 
        why: "A 'hypermodern' opening. You let White take the center with pawns, then spend the whole game attacking those pawns. It sets up incredibly sharp, exciting tactical battles."
    },
    { 
        name: "London System", 
        moves: ["d4", "Nf6", "Bf4"], 
        why: "The London is a 'set-and-forget' system for White. No matter what Black plays, you usually play the same solid moves. It sets up a very safe, solid position where you rarely fall into early traps."
    },
    { 
        name: "Vienna Game", 
        moves: ["e4", "e5", "Nc3"], 
        why: "A clever alternative to the main lines. By playing Nc3 before Nf3, you keep the f-pawn free to move (the Vienna Gambit). It sets up surprising attacks that many players aren't prepared for."
    }
];

var currentOpening, currentStep;

function startNewQuiz() {
    currentOpening = openings[Math.floor(Math.random() * openings.length)];
    currentStep = 0;
    game.reset();
    board.position('start');
    document.getElementById('opening-name').innerText = "Goal: " + currentOpening.name;
    document.getElementById('status').innerText = "Your move! Follow the line...";
}

function onDrop(source, target) {
    var move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';

    if (move.san === currentOpening.moves[currentStep]) {
        currentStep++;
        if (currentStep === currentOpening.moves.length) {
            document.getElementById('status').innerHTML = 
                `<strong>Correct!</strong><br><br>${currentOpening.why}<br><br>` +
                `<button onclick="startNewQuiz()" style="background: #e67e22">Try Next Opening</button>`;
        } else {
            document.getElementById('status').innerText = "Correct! Keep going...";
        }
    } else {
        document.getElementById('status').innerText = "Not quite the " + currentOpening.name + ". Try again!";
        game.undo();
        return 'snapback';
    }
}

var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboard-js/1.0.0/img/chesspieces/wikipedia/{piece}.png'
};

board = Chessboard('myBoard', config);
startNewQuiz();
$(window).resize(board.resize);
