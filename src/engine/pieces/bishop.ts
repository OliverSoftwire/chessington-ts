import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";

export class Bishop extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentPosition = _board.findPiece(this);
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

		return moves.filter(
			(square) =>
				square.row >= 0 &&
				square.row < 8 &&
				square.col >= 0 &&
				square.col < 8,
		);
	}
}
