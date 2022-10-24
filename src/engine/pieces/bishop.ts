import Board from "../board";
import { Piece } from "./piece";
import Square from "../square";

export class Bishop extends Piece {
	constructor(player: symbol) {
		super(player);
	}

	getAvailableMoves(_board: Board) {
		return [] as Square[];
	}
}
