class Piece {
	constructor(color, currentPosRow, currentPosCol, piece) {
		this.color = color;
		this.currentPosRow = currentPosRow;
		this.currentPosCol = currentPosCol;
		this.piece = piece;
		//console.log(currentPosRow);
	}

	get pieceColor() {
		return this.color;
	}

	getRow() {
		return this.currentPosRow;
	}

	getCol() {
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
	moved = false
	getMoved() {
		return this.moved;
	}
	setMoved() {
		this.moved = true;
	}
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'R');
	}

	checkLegal(board, newRow, newCol) {
		if ((board[newRow][newCol] == null) || (board[newRow][newCol]).color != this.color) {
			var king = board[this.getRow()][this.getCol() - 1]
			if (king != null && king.toString() == 'K' && king.getCastling()) {
				king.setCastling()
				return true;
			}
			if ((newCol == this.getCol())) {
				var max = Math.max(this.getRow() , newRow);
				var min = Math.min(this.getRow(), newRow);
				for (var i = min + 1; i < max ; i++) {
					if (board[i][this.getCol()] !== null) {
						return false;
					}					
				}
				return true;
			}
			else if (newRow == this.getRow()) {
				var max = Math.max(this.getCol() , newCol);
				var min = Math.min(this.getCol(), newCol);
				for (var i = min + 1; i < max ; i++) {
					if (board[this.getRow()][i] !== null) {
						return false;
					}
				}
				return true;
			}
		}
		return false;
	}

	movePiece(board, newRow, newCol) {
		var hold = this.checkLegal(board, newRow, newCol)
		
		if (hold) {
			board[newRow][newCol] = this;
			board[this.getRow()][this.getCol()] = null;

			super.currentPosRow = newRow;
			super.currentPosCol = newCol;
			return true;
		}
		return false;
	}
}

class Knight extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'R');
	}

	checkLegal(board, newRow, newCol) {
		if ((board[newRow][newCol] == null) || (board[newRow][newCol]).color != this.color) {
			if (Math.abs(newRow - this.getRow()) == 2 && Math.abs(newCol - this.getCol()) == 1) {
				return true;
			}

			if (Math.abs(newRow - this.getRow()) == 1 && Math.abs(newCol - this.getCol()) == 2) {
				return true;
			}
		}
		
		return false;
	}

	movePiece(board, newRow, newCol) {
		if (this.checkLegal(board, newRow, newCol)) {
			board[newRow][newCol] = this;
			board[this.getRow()][this.getCol()] = null;

			super.currentPosRow = newRow;
			super.currentPosCol = newCol;
			return true;
		}
		return false;
	}
}

class Bishop extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'R');
	}

	checkLegal(board, newRow, newCol) {
		if ((board[newRow][newCol] == null) || (board[newRow][newCol]).color != this.color) {
			var val = Math.abs(this.getRow() - newRow)
			var val2 = Math.abs(this.getCol() - newCol)
			if (val == val2) {
				for (var i = 1 ; i < val2 ; i++) {
					if (this.getRow() < newRow && this.getCol() < newCol) {
						if (board[this.getRow() + i][this.getCol() + i] != null)  {
							return false;
						}
					}
					else if (this.getRow() > newRow && this.getCol() < newCol) {
						if (board[this.getRow() - i][this.getCol() + i] != null)  {
							return false;
						}
					}
					else if (this.getRow() < newRow && this.getCol() > newCol) {
						if (board[this.getRow() + i][this.getCol() - i] != null)  {
							return false;
						}
					}
					else {
						if (board[this.getRow() - i][this.getCol() - i] != null)  {
							return false;
						}
					}
				}
				return true;
			}
		}
		return false;
	}

	movePiece(board, newRow, newCol) {
		//console.log(super(getRow()));
		if (this.checkLegal(board, newRow, newCol)) {
			board[newRow][newCol] = this;
			board[this.getRow()][this.getCol()] = null;

			super.currentPosRow = newRow;
			super.currentPosCol = newCol;
			return true;
		}
		return false;
	}
}

class Queen extends Piece {
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'Q');
	}
	checkLegal(board, newRow, newCol) {
		if ((board[newRow][newCol] == null) || (board[newRow][newCol]).color != this.color) {
			
			if ((newCol == this.getCol())) {
				var max = Math.max(this.getRow() , newRow);
				var min = Math.min(this.getRow(), newRow);
				for (var i = min + 1; i < max ; i++) {
					if (board[i][this.getCol()] !== null) {
						return false;
					}					
				}
				return true;
			}
			else if (newRow == this.getRow()) {
				var max = Math.max(this.getCol() , newCol);
				var min = Math.min(this.getCol(), newCol);
				for (var i = min + 1; i < max ; i++) {
					if (board[this.getRow()][i] !== null) {
						return false;
					}
				}
				return true;
			}

			var val = Math.abs(this.getRow() - newRow)
			var val2 = Math.abs(this.getCol() - newCol)
			if (val == val2) {
				for (var i = 1 ; i < val2 ; i++) {
					if (this.getRow() < newRow && this.getCol() < newCol) {
						if (board[this.getRow() + i][this.getCol() + i] != null)  {
							return false;
						}
					}
					else if (this.getRow() > newRow && this.getCol() < newCol) {
						if (board[this.getRow() - i][this.getCol() + i] != null)  {
							return false;
						}
					}
					else if (this.getRow() < newRow && this.getCol() > newCol) {
						if (board[this.getRow() + i][this.getCol() - i] != null)  {
							return false;
						}
					}
					else {
						if (board[this.getRow() - i][this.getCol() - i] != null)  {
							return false;
						}
					}
				}
				return true;
			}
		}
		return false;
	}
 
	movePiece(board, newRow, newCol) {
		//console.log(super(getRow()));
		if (this.checkLegal(board, newRow, newCol)) {
			board[newRow][newCol] = this;
			board[this.getRow()][this.getCol()] = null;

			super.currentPosRow = newRow;
			super.currentPosCol = newCol;
			return true;
		}
		return false;
	}
}

class King extends Piece {
	moved = false
	castling = false
	getCastling() {
		return this.castling
	}
	setCastling() {
		this.castling = false
	}
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'K');
	}
	checkLegal(board, newRow, newCol) {
		if ((board[newRow][newCol] == null) || (board[newRow][newCol]).color != this.color) {
			if (Math.abs(newRow - this.getRow()) <= 1 && Math.abs(newCol - this.getCol()) <= 1) {
				return true;
			}
		}
		//king side castling
		if ((board[newRow][newCol] == null) && (this.getRow() == newRow) && (!this.moved) &&(newCol - this.getCol() == 2)) {
			this.moved = true;
			if ((board[this.getRow()][this.getCol() + 1] == null)) { //checks next to square
				var a = board[this.getRow()][this.getCol() + 3]
				if (board[this.getRow()][this.getCol() + 3].toString() == 'R') {
					if (!a.getMoved()) {
						a.setMoved()
						this.castling = true
						//a.movePiece(board, this.getRow(), this.getCol() + 1)
						return true;
					}
				}
			}
		}
		return false;
	}

	movePiece(board, newRow, newCol) {
		//console.log(super(getRow()));
		if (this.checkLegal(board, newRow, newCol)) {
			board[newRow][newCol] = this;
			board[this.getRow()][this.getCol()] = null;

			super.currentPosRow = newRow;
			super.currentPosCol = newCol;
			return true;
		}
		return false;
	}
}

class Pawn extends Piece {
	moved = false;
	constructor(color, currentPosRow, currentPosCol) {
		super(color, currentPosRow, currentPosCol, 'P');
	}
	checkLegal(board, newRow, newCol) {
		if (this.color == 'b') {
			if (board[newRow][newCol] != null) {
				if (board[newRow][newCol].color != this.color) {
					if (Math.abs(this.getCol() - newCol) == 1 && newRow == this.getRow() + 1) {
						this.moved = true;
						return true;
					}
				}
			}
			else {
				if (newCol != this.getCol()) {
					return false;
				}
				if (newRow - this.getRow() == 1) {
					this.moved = true;
					return true;
				}
				else if ((newRow - this.getRow() == 2) && (!this.moved)) {
					this.moved = true;
					return true;
				}
			}
		}
		else {
			if (board[newRow][newCol] != null) {
				if (board[newRow][newCol].color != this.color) {
					if (Math.abs(this.getCol() - newCol) == 1 && newRow + 1 == this.getRow()) {
						this.moved = true;
						return true;
					}
				}
			}
			else {
				if (newCol != this.getCol()) {
					return false;
				}
				if (newRow - this.getRow() == -1) {
					this.moved = true;
					return true;
				}
				else if ((newRow - this.getRow() == -2) && (!this.moved)) {
					this.moved = true;
					return true;
				}
			}
		}
		return false;
	}

	movePiece(board, newRow, newCol) {
		//console.log(super(getRow()));
		if (this.checkLegal(board, newRow, newCol)) {
			board[newRow][newCol] = this;
			board[this.getRow()][this.getCol()] = null;

			super.currentPosRow = newRow;
			super.currentPosCol = newCol;
			return true;
		}
		return false;
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
        move: chessBoard[7][1].movePiece(chessBoard, 5, 0)
    };
    //console.log(chessBoard[7][0])
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

var movePiece=function(oldId, newId){
   return chessBoardMovePiece(oldId, newId)
}

var isCastle=function(oldId, newId) {
	var row = parseInt(oldId[0])
	var col = parseInt(oldId[1])

	var newRow = parseInt(newId[0])
	var newCol = parseInt(newId[1])

	if (chessBoard[newRow][newCol] != null && chessBoard[newRow][newCol].toString() == 'K') {
		var bool = chessBoard[newRow][newCol].getCastling();
		//chessBoard[row][col].setCastling()
		return bool;
	}
	else {
		return false;
	}
}

function chessBoardMovePiece(id, newId) {
	var row = parseInt(id[0])
	var col = parseInt(id[1])

	var newRow = parseInt(newId[0])
	var newCol = parseInt(newId[1])
	if (chessBoard[row][col] != null) {
		//console.log("here")
		var a= chessBoard[row][col].movePiece(chessBoard, newRow, newCol);
		//console.log(a)
		return a;

	}

	else {
		return false;
	} 
}

