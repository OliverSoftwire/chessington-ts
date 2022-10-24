import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";

const MOVES = [
	// Up
	new Square(2, -1),
	new Square(2, 1),

	// Down
	new Square(-2, -1),
	new Square(-2, 1),

	// Left
	new Square(1, -2),
	new Square(-1, -2),

	// Right
	new Square(1, 2),
	new Square(-1, 2),
];

export class Knight extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentPosition = _board.findPiece(this);
		return MOVES.map(
			(move) =>
				new Square(
					currentPosition.row + move.row,
					currentPosition.col + move.col,
				),
		).filter(
			(move) =>
				move.row >= 0 &&
				move.row < 8 &&
				move.col >= 0 &&
				move.col < 8,
		);
	}
}
