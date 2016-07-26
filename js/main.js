var squares = document.getElementsByClassName('square');
var x = '<i class="fa fa-times" aria-hidden="true"></i>';
var o = '<i class="fa fa-circle-o" aria-hidden="true"></i>';

var occupiedSquares;
var availableSquares;
var moveCount;

var comment = document.getElementById('comment');

var clearButton = document.getElementById('clear');
var playersHandle = document.getElementById('players');
var players = playersHandle.value;

gameLoop();
clearButton.addEventListener('click', clearBoard);
playersHandle.addEventListener('change', function() {
	players = this.value;
});

function gameLoop () {
	for (var i = 0, len = squares.length; i < len; i++){
		squares[i].addEventListener('click', squareListener);
	}
	comment.innerHTML = 'x\'s move';
	occupiedSquares = [];
	moveCount = 0;
}


function checkForWin(move) {
	// horizontal win
	if (squares[0].occupied === move && squares[3].occupied === move && squares[6].occupied === move) return true;
	if (squares[1].occupied === move && squares[4].occupied === move && squares[7].occupied === move) return true;
	if (squares[2].occupied === move && squares[5].occupied === move && squares[8].occupied === move) return true;

	// vertical win
	if (squares[0].occupied === move && squares[1].occupied === move && squares[2].occupied === move) return true;
	if (squares[3].occupied === move && squares[4].occupied === move && squares[5].occupied === move) return true;
	if (squares[6].occupied === move && squares[7].occupied === move && squares[8].occupied === move) return true;

	// diagonal win
	if (squares[0].occupied === move && squares[4].occupied === move && squares[8].occupied === move) return true;
	if (squares[6].occupied === move && squares[4].occupied === move && squares[2].occupied === move) return true;
}
 
function evaluateGame() {
	if (checkForWin('x')) {
		return comment.innerHTML = 'x has won';
	} else if (checkForWin('o')) {
		return comment.innerHTML = 'o has won';
	} else {
		return false;
	}
}

function squareListener () {

	// check to see if the position is occupied
	if (this.occupied) {
		positionOccupied();
		return true; //escape other operations
	}

	moveCount++;
 
	// 1 player game (you vs. computer)
	if (players == 1) {
		moveCount++;
		this.innerHTML = x;
		this.className += ' x';
		this.occupied = 'x';

		// get computer's available move

		var computersMove = getAvailableSquare();

		// occupy square
		computersMove.occupied = 'o';
		computersMove.className += ' o';
		computersMove.innerHTML = o;
		if (evaluateGame()) {
			alert(evaluateGame());
			clearBoard();
		}

	// 2 player game 
	} else { 
		if (moveCount % 2 === 0) {
			comment.innerHTML = 'x\'s move';
			this.innerHTML = o;
			this.className += ' o';
			this.occupied = 'o'; // changes state to occupied
		} else {
			comment.innerHTML = 'o\'s move';
			this.innerHTML = x;
			this.className += ' x';
			this.occupied = 'x'; //changes state to occupied
		}
		if (evaluateGame()) {
			alert(evaluateGame());
			clearBoard();
		}
	}
}

// Get an available square for the computer to randomly use
function getAvailableSquare() {
	var availableSquares = [];
	for (var i = 0; i < squares.length; i++) {
		if (!squares[i].occupied) {
			availableSquares.push(squares[i]);
		}
	}
	return availableSquares[Math.floor(Math.random()*availableSquares.length)];
}


// Resets all squares to blank, removes all 'occupied' states,
// kills the click listener, resets moveCount to zero
function clearBoard() {
	for (var i = 0, len = squares.length; i < len; i++) {
		squares[i].innerHTML = '&nbsp;';
		squares[i].occupied = false;
		squares[i].removeEventListener('click', squareListener);
		squares[i].className = 'square';
	}
	gameLoop();
}

function positionOccupied() {
	comment.innerHTML = 'position occupied';
}