import Square from "engine/square";
import Board from "engine/board";
import GameSettings from "engine/gameSettings";

const { BOARD_SIZE } = GameSettings;

export function isOnBoard(square: Square): boolean {
	return (
		square.row >= 0 &&
		square.row < BOARD_SIZE &&
		square.col >= 0 &&
		square.col < BOARD_SIZE
	);
}

function filterLines(
	currentPosition: Square,
	board: Board,
	lineFuncs: ((offset: number) => Square)[],
): Square[] {
	const moves: Square[] = [];

	const offsets = Array.from(
		{ length: BOARD_SIZE - 2 },
		(_, i) => i + 1,
	);

	const lines = lineFuncs.map((func) => offsets.map(func));

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

export function buildOrthogonalMoves(
	currentPosition: Square,
	board: Board,
): Square[] {
	return filterLines(currentPosition, board, [
		(offset) => new Square(offset, 0),
		(offset) => new Square(-offset, 0),
		(offset) => new Square(0, offset),
		(offset) => new Square(0, -offset),
	]);
}

export function buildDiagonalMoves(
	currentPosition: Square,
	board: Board,
): Square[] {
	return filterLines(currentPosition, board, [
		(offset) => new Square(offset, offset),
		(offset) => new Square(offset, -offset),
		(offset) => new Square(-offset, offset),
		(offset) => new Square(-offset, -offset),
	]);
}
