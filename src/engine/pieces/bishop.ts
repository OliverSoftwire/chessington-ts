import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";
import { buildDiagonalMoves } from "engine/moveHelpers";

export class Bishop extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentPosition = _board.findPiece(this);
		return buildDiagonalMoves(currentPosition);
	}
}
