import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";

export class Pawn extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentSquare = _board.findPiece(this);

		return [
			new Square(
				currentSquare.row + (this.player == Player.WHITE ? 1 : -1),
				currentSquare.col,
			),
		];
	}
}
