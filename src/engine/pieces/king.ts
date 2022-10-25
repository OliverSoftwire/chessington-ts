import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { canMoveOntoSquare } from "engine/moveHelpers";
import Player from "engine/player";
import GameSettings from "engine/gameSettings";
import { Rook } from "./rook";

function isSquareAttacked(
	board: Board,
	defendingPlayer: symbol,
	square: Square,
): boolean {
	const attackingPlayer =
		defendingPlayer === Player.WHITE ? Player.BLACK : Player.WHITE;
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
		const normalMoves = this.getAttackingSquares(board).filter(
			(move) => {
				if (!canMoveOntoSquare(move, this, board)) {
					return false;
				}

				return !isSquareAttacked(board, this.player, move);
			},
		);

		const currentPosition = board.findPiece(this);
		if (
			this.hasMoved ||
			isSquareAttacked(board, this.player, currentPosition)
		) {
			return normalMoves;
		}

		const rooksToCastle = board.board[currentPosition.row].filter(
			(piece, col) =>
				!!piece &&
				piece instanceof Rook &&
				piece.player === this.player &&
				!piece.hasMoved &&
				Math.abs(col - currentPosition.col) > 2,
		) as Rook[];

		if (rooksToCastle.length < 1) {
			return normalMoves;
		}

		const queensideRook = rooksToCastle
			.filter(
				(rook) => board.findPiece(rook).col < currentPosition.col,
			)
			.reduce((prev: undefined | Rook, curr) => {
				if (!prev) return curr;

				return board.findPiece(prev).col >
					board.findPiece(curr).col
					? prev
					: curr;
			}, undefined);

		const kingsideRook = rooksToCastle
			.filter(
				(rook) => board.findPiece(rook).col > currentPosition.col,
			)
			.reduce((prev: undefined | Rook, curr) => {
				if (!prev) return curr;

				return board.findPiece(prev).col <
					board.findPiece(curr).col
					? prev
					: curr;
			}, undefined);

		const possibleCastleMoves = [
			new Square(currentPosition.row, currentPosition.col - 2),
			new Square(currentPosition.row, currentPosition.col + 2),
		].filter((move) => {
			for (
				let col = move.col;
				col !== currentPosition.col;
				col += move.col < currentPosition.col ? 1 : -1
			) {
				const square = new Square(currentPosition.row, col);
				if (isSquareAttacked(board, this.player, square)) {
					return false;
				}
			}

			const isKingside = move.col > currentPosition.col;

			const rook = isKingside ? kingsideRook : queensideRook;
			if (!rook) {
				return false;
			}

			const rookPosition = board.findPiece(rook);
			const rookDirection = isKingside ? 1 : -1;

			for (
				let col = 1;
				col < Math.abs(rookPosition.col - currentPosition.col);
				col++
			) {
				if (
					board.getPiece(
						new Square(
							currentPosition.row,
							currentPosition.col + col * rookDirection,
						),
					)
				) {
					return false;
				}
			}

			return true;
		});

		return normalMoves.concat(possibleCastleMoves);
	}
}
