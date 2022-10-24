import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";
import { canAttack, isOnBoard } from "engine/moveHelpers";

export class Pawn extends Piece {
	hasMoved: boolean = false;
	movedTwoSpaces: boolean = false;

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

		if (!isOnBoard(moves[0]) || board.getPiece(moves[0])) {
			return [];
		}

		if (!this.hasMoved) {
			const move = new Square(
				currentSquare.row + this.getDirection() * 2,
				currentSquare.col,
			);

			if (isOnBoard(move) && !board.getPiece(move)) {
				moves.push(move);
			}
		}

		const attacks = [
			new Square(
				currentSquare.row + this.getDirection(),
				currentSquare.col - 1,
			),
			new Square(
				currentSquare.row + this.getDirection(),
				currentSquare.col + 1,
			),
		].filter((attack) => {
			if (canAttack(this, board.getPiece(attack))) {
				return true;
			}

			const adjacentPiece = board.getPiece(
				new Square(currentSquare.row, attack.col),
			);

			return (
				adjacentPiece instanceof Pawn &&
				adjacentPiece.movedTwoSpaces &&
				board.lastMoved === adjacentPiece
			);
		});

		return moves.concat(attacks);
	}

	moveTo(board: Board, newSquare: Square): void {
		this.hasMoved = true;

		const currentSquare = board.findPiece(this);
		this.movedTwoSpaces =
			newSquare.col === currentSquare.col &&
			newSquare.row === currentSquare.row + 2 * this.getDirection();

		super.moveTo(board, newSquare);
	}
}
