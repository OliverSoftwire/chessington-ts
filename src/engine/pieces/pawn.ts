import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";

export class Pawn extends Piece {
	hasMoved: boolean = false;

	constructor(player: Player) {
		super(player);
	}

	getDirection() {
		return this.player === Player.WHITE ? 1 : -1;
	}

	getAvailableMoves(board: Board): Square[] {
		const currentSquare = board.findPiece(this);

		const moves = [
			new Square(
				currentSquare.row + this.getDirection(),
				currentSquare.col,
			),
		];

		if (board.getPiece(moves[0])) {
			return [];
		}

		if (!this.hasMoved) {
			moves.push(
				new Square(
					currentSquare.row + this.getDirection() * 2,
					currentSquare.col,
				),
			);

			if (board.getPiece(moves[1])) {
				return [];
			}
		}

		return moves;
	}

	moveTo(board: Board, newSquare: Square): void {
		super.moveTo(board, newSquare);
		this.hasMoved = true;
	}
}
