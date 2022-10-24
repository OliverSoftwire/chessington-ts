import Square from "engine/square";
import Board from "engine/board";

export function isOnBoard(square: Square): boolean {
	return (
		square.row >= 0 &&
		square.row < 8 &&
		square.col >= 0 &&
		square.col < 8
	);
}

export function buildOrthogonalMoves(
	currentPosition: Square,
	board: Board,
): Square[] {
	const moves: Square[] = [];

	for (let row = currentPosition.row + 1; row < 8; row++) {
		const move = new Square(row, currentPosition.col);
		moves.push(move);

		if (board.getPiece(move)) break;
	}

	for (let row = currentPosition.row - 1; row >= 0; row--) {
		const move = new Square(row, currentPosition.col);
		moves.push(move);

		if (board.getPiece(move)) break;
	}

	for (let col = currentPosition.col + 1; col < 8; col++) {
		const move = new Square(currentPosition.row, col);
		moves.push(move);

		if (board.getPiece(move)) break;
	}

	for (let col = currentPosition.col - 1; col >= 0; col--) {
		const move = new Square(currentPosition.row, col);
		moves.push(move);

		if (board.getPiece(move)) break;
	}

	return moves;
}

export function buildDiagonalMoves(currentPosition: Square): Square[] {
	const moves: Square[] = [];

	for (let offset = -7; offset < 8; offset++) {
		if (offset === 0) continue;

		moves.push(
			new Square(
				currentPosition.row + offset,
				currentPosition.col + offset,
			),
			new Square(
				currentPosition.row - offset,
				currentPosition.col + offset,
			),
		);
	}

	return moves.filter((move) => isOnBoard(move));
}
