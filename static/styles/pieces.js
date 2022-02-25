class Piece {
	constructor(color, currentPosRow, currentPosCol, piece) {
		this.color = color;
		this.currentPosRow = currentPosRow;
		this.currentPosCol = currentPosCol;
		this.piece = piece
	}

	get pieceColor() {
		return this.color;
	}

	get piecePos() {
		return this.currentPos;
	}

	checkCapture(board) {
		if (board[currentPosRow][currentPosCol] instanceof Piece) {
			var otherPiece = (Piece) board[currentPosRow][currentPosCol];
			if (otherPiece.pieceColor() != this.pieceColor()) {
				board[currentPosRow].splice(currentPosCol, 1);
				board[currentPosRow][currentPosCol] = this;
			} else {
				return false; //illegal
			}
		} else {
			//means the index is empty
			if (board[currentPosRow][currentPosCol] == null) {
				return false;
			}
		}

		return true;
	}
}

class Rook extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'R');
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