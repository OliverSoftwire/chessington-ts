import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { buildDiagonalMoves } from "engine/moveHelpers";

export class Bishop extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAvailableMoves(board: Board): Square[] {
		const currentPosition = board.findPiece(this);
		return buildDiagonalMoves(currentPosition, board);
	}
}
