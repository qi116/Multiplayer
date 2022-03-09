class Piece {
	constructor(color, currentPosRow, currentPosCol, piece) {
		this.color = color;
		this.currentPosRow = currentPosRow;
		this.currentPosCol = currentPosCol;
		this.piece = piece;
	}

	get pieceColor() {
		return this.color;
	}

	get getRow() {
		return this.currentPosRow;
	}

	get getCol() {
		return this.currentPosCol;
	}

	toString() {
		// if (this.currentPosCol == 7) {
		// 	return this.piece + "<br>"
		// }
	  	return this.piece;
	}

	// checkCapture(board) {
	// 	if (board[currentPosRow][currentPosCol] instanceof Piece) {
	// 		var otherPiece = (Piece) board[currentPosRow][currentPosCol];
	// 		if (otherPiece.pieceColor() != this.pieceColor()) {
	// 			board[currentPosRow].splice(currentPosCol, 1);
	// 			board[currentPosRow][currentPosCol] = this;
	// 		} else {
	// 			return false; //illegal
	// 		}
	// 	} else {
	// 		//means the index is empty
	// 		if (board[currentPosRow][currentPosCol] == null) {
	// 			return false;
	// 		}
	// 	}

	// 	return true;
	// }
}

class Rook extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'R');
	}

	checkLegal(board, newRow, newCol) {
		if ((board[newRow][newCol] == null)) {
			return true;
		}
	}

	movePiece(board, newRow, newCol) {
		//console.log(super(getRow()));
		if (this.checkLegal(board, newRow, newCol)) {
			board[newRow][newCol] = this;
			//board[super.getRow()][super.getCol()] = null;

			currentPosRow = newRow;
			currentPosCol = newCol;
		}
	}
}

class Knight extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'N');
	}
}

class Bishop extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'B');
	}
}

class Queen extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'Q');
	}
}

class King extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'K');
	}
}

class Pawn extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'P');
	}
}

function printBoard(board) {
	// for (var row = 0 ; row < board.length ; row++) {
	// 	for (var col = 0 ; col < board[0].length ; col++) {
	// 		console.log("hello")
	// 	}
	// }

	return '<h1> hello </h1>'
}

var simple=function(){
   var textMultiple = {
        board:chessBoard,
        text2:"text2",
        move: chessBoard[7][0].movePiece(chessBoard, 5, 0)
    };
   return textMultiple;
}


var chessBoard = [
	[new Rook('b', 0, 0), new Knight('b', 0, 1), new Bishop('b', 0, 2), new Queen('b', 0, 3), new King('b', 0, 4), new Bishop('b', 0, 5), new Knight('b', 0, 6), new Rook('b', 0, 7)],
	[new Pawn('b', 1, 0), new Pawn('b', 1, 1), new Pawn('b', 1, 2), new Pawn('b', 1, 3), new Pawn('b', 1, 4), new Pawn('b', 1, 5), new Pawn('b', 1, 6), new Pawn('b', 1, 7)],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[new Pawn('w', 6, 0), new Pawn('w', 6, 1), new Pawn('w', 6, 2), new Pawn('w', 6, 3), new Pawn('w', 6, 4), new Pawn('w', 6, 5), new Pawn('w', 6, 6), new Pawn('w', 6, 7)],
	[new Rook('w', 7, 0), new Knight('w', 7, 1), new Bishop('w', 7, 2), new Queen('w', 7, 3), new King('w', 7, 4), new Bishop('w', 7, 5), new Knight('w', 7, 6), new Rook('w', 7, 7)]
];

