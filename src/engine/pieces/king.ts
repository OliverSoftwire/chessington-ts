import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";

export class King extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAvailableMoves(_board: Board): Square[] {
		return [] as Square[];
	}
}
