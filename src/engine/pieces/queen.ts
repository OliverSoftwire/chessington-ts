import Board from "../board";
import Player from "../player";
import { Piece } from "./piece";
import Square from "../square";
import {
	buildOrthogonalMoves,
	buildDiagonalMoves,
} from "engine/moveHelpers";

export class Queen extends Piece {
	constructor(player: Player) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		const currentPosition = _board.findPiece(this);
		return buildOrthogonalMoves(currentPosition).concat(
			buildDiagonalMoves(currentPosition),
		);
	}
}
