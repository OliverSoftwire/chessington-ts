import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";
import { buildOrthogonalMoves } from "engine/moveHelpers";

export class Rook extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAvailableMoves(board: Board): Square[] {
		return buildOrthogonalMoves(this, board);
	}
}
