var squares = document.getElementsByClassName('square');
var x = '<i class="fa fa-times" aria-hidden="true"></i>';
var o = '<i class="fa fa-circle-o" aria-hidden="true"></i>';

var comment = document.getElementById('comment');

var moveCount = 0;

var clearButton = document.getElementById('clear');
var players = document.getElementById('players').value;

gameLoop();
clearButton.addEventListener('click', clearBoard);


function gameLoop () {
	for (var i = 0, len = squares.length; i < len; i++){
		squares[i].addEventListener('click', squareListener);
	}
}

function squareListener () {

	// First, check to see if the position is occupied
	if (this.occupied) {
		comment.innerHTML = 'Position occupied'
		return true; //escape other operations
	}

	moveCount++;
	this.occupied = true; //changes state of square to ocupied;

	if (players == 1) {
		this.innerHTML = x;
		this.className += ' x';
		// computerMove();

	} else { 
		if (moveCount % 2 === 0) {
			this.innerHTML = o;
			this.className += ' o';
		} else {
			this.innerHTML = x;
			this.className += ' x';
		}
	}
}

// Resets all squares to blank, removes all 'occupied' states,
// kills the click listener, resets moveCount to zerp
function clearBoard() {
	for (var i = 0, len = squares.length; i < len; i++) {
		squares[i].innerHTML = '&nbsp;';
		squares[i].occupied = false;
		squares.removeEventListener('click', squareListener);
	}
	moveCount = 0;
}

function checkWin() {
	
}