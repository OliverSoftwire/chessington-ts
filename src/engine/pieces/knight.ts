import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";
import { canMoveOntoSquare } from "engine/moveHelpers";

export class Knight extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAttackingSquares(board: Board): Square[] {
		const currentPosition = board.findPiece(this);

		return [
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
		].map(
			(offset) =>
				new Square(
					currentPosition.row + offset.row,
					currentPosition.col + offset.col,
				),
		);
	}

	getAvailableMoves(board: Board): Square[] {
		return this.getAttackingSquares(board).filter((move) =>
			canMoveOntoSquare(move, this, board),
		);
	}
}
