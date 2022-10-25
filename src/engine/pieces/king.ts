import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { canMoveOntoSquare } from "engine/moveHelpers";
import Player from "engine/player";

function isSquareAttacked(
	board: Board,
	attackingPlayer: symbol,
	square: Square,
): boolean {
	const opponentPieces = board.getPiecesOfPlayer(attackingPlayer);

	for (const piece of opponentPieces) {
		const attackedSquares = piece.getAttackingSquares(board);

		if (
			attackedSquares.find((attackedSquare) =>
				attackedSquare.equals(square),
			)
		) {
			return true;
		}
	}

	return false;
}

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

			return !isSquareAttacked(
				board,
				this.player === Player.WHITE ? Player.BLACK : Player.WHITE,
				move,
			);
		});
	}
}
