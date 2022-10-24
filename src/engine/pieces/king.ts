import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { isValidMove } from "engine/moveHelpers";

const MOVES = [
	new Square(1, 0),
	new Square(1, 1),
	new Square(0, 1),
	new Square(-1, 1),
	new Square(-1, 0),
	new Square(-1, -1),
	new Square(0, -1),
	new Square(1, -1),
];

export class King extends Piece {
	constructor(player: symbol) {
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
