import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { isOnBoard } from "engine/moveHelpers";

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

	getAvailableMoves(_board: Board): Square[] {
		const currentPosition = _board.findPiece(this);
		return MOVES.map(
			(move) =>
				new Square(
					currentPosition.row + move.row,
					currentPosition.col + move.col,
				),
		).filter((move) => isOnBoard(move));
	}
}
