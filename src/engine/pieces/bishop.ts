import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { buildDiagonalMoves, canMoveOntoSquare } from "engine/moveHelpers";

export class Bishop extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAttackingSquares(board: Board): Square[] {
		return buildDiagonalMoves(this, board);
	}

	getAvailableMoves(board: Board): Square[] {
		return this.getAttackingSquares(board).filter((move) =>
			canMoveOntoSquare(move, this, board),
		);
	}
}
