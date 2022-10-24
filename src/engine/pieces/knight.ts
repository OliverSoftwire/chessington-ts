import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";
import { isValidMove } from "engine/moveHelpers";

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

	getAvailableMoves(board: Board): Square[] {
		const currentPosition = board.findPiece(this);
		return MOVES.map(
			(move) =>
				new Square(
					currentPosition.row + move.row,
					currentPosition.col + move.col,
				),
		).filter((move) => isValidMove(move, this, board));
	}
}
