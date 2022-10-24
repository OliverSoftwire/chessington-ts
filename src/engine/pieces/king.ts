import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { canMoveOntoSquare } from "engine/moveHelpers";
import Player from "engine/player";

export class King extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAttackingSquares(board: Board): Square[] {
		const currentPosition = board.findPiece(this);

		return [
			new Square(1, 0),
			new Square(1, 1),
			new Square(0, 1),
			new Square(-1, 1),
			new Square(-1, 0),
			new Square(-1, -1),
			new Square(0, -1),
			new Square(1, -1),
		].map(
			(move) =>
				new Square(
					currentPosition.row + move.row,
					currentPosition.col + move.col,
				),
		);
	}

	getAvailableMoves(board: Board): Square[] {
		return this.getAttackingSquares(board).filter((move) => {
			if (!canMoveOntoSquare(move, this, board)) {
				return false;
			}

			const opponentPieces = board.getPiecesOfPlayer(
				this.player === Player.WHITE ? Player.BLACK : Player.WHITE,
			);

			for (const piece of opponentPieces) {
				const attackedSquares = piece.getAttackingSquares(board);

				if (
					attackedSquares.find(
						(square) =>
							square.row === move.row &&
							square.col === move.col,
					)
				) {
					return false;
				}
			}

			return true;
		});
	}
}
