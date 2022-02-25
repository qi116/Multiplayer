function printBoard(board) {
	for (var row = 0 ; row < board.length ; row++) {
		for (var col = 0 ; col < board[0].length ; col++) {
			console.log()
		}
	}
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