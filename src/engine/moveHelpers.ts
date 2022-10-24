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

	const offsets = Array.from({ length: 6 }, (_, i) => i + 1);
	const lines = [
		offsets.map((offset) => new Square(offset, 0)),
		offsets.map((offset) => new Square(-offset, 0)),
		offsets.map((offset) => new Square(0, offset)),
		offsets.map((offset) => new Square(0, -offset)),
	];

	for (const line of lines) {
		for (const offset of line) {
			const move = new Square(
				currentPosition.row + offset.row,
				currentPosition.col + offset.col,
			);
			if (!isOnBoard(move)) break;

			moves.push(move);

			if (board.getPiece(move)) break;
		}
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
