import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";

export class Pawn extends Piece {
	hasMoved: boolean = false;
	direction: number;

	constructor(player: Player) {
		super(player);

		this.direction = player === Player.WHITE ? 1 : -1;
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentSquare = _board.findPiece(this);

		const moves = [
			new Square(
				currentSquare.row + this.direction,
				currentSquare.col,
			),
		];

		if (!this.hasMoved) {
			moves.push(
				new Square(
					currentSquare.row + this.direction * 2,
					currentSquare.col,
				),
			);
		}

		return moves;
	}

	moveTo(board: Board, newSquare: Square): void {
		super.moveTo(board, newSquare);
		this.hasMoved = true;
	}
}
