import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";

export class Queen extends Piece {
	constructor(player: Player) {
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

		for (let row = 0; row < 8; row++) {
			if (row === currentPosition.row) continue;
			moves.push(new Square(row, currentPosition.col));
		}

		for (let col = 0; col < 8; col++) {
			if (col === currentPosition.col) continue;
			moves.push(new Square(currentPosition.row, col));
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
