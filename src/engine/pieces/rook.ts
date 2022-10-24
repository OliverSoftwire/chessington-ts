import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";

export class Rook extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentPosition = _board.findPiece(this);
		const moves: Square[] = [];

		for (let row = 0; row < 8; row++) {
			if (row === currentPosition.row) continue;
			moves.push(new Square(row, currentPosition.col));
		}

		for (let col = 0; col < 8; col++) {
			if (col === currentPosition.col) continue;
			moves.push(new Square(currentPosition.row, col));
		}

		return moves;
	}
}
