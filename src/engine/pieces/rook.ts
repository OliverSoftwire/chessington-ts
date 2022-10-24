import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";
import {
	buildOrthogonalMoves,
	canMoveOntoSquare,
} from "engine/moveHelpers";

export class Rook extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAttackingSquares(board: Board): Square[] {
		return buildOrthogonalMoves(this, board);
	}

	getAvailableMoves(board: Board): Square[] {
		return this.getAttackingSquares(board).filter((move) =>
			canMoveOntoSquare(move, this, board),
		);
	}
}
