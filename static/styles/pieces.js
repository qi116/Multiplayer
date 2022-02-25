class Piece {
	constructor(color, currentPosRow, currentPosCol) {
		this.color = color;
		this.currentPosRow = currentPosRow;
		this.currentPosCol = currentPosCol;
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
		super(color, currentPosRow, currentPosCol);
	}
}

class Knight extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol);
	}
}

class Bishop extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol);
	}
}

class Queen extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol);
	}
}

class King extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol);
	}
}

class Rook extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol);
	}
}

class Pawn extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol);
	}
}