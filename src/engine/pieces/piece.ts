import Board from "../board";
import Player from "../player";
import Square from "../square";

export class Piece {
	player: symbol;
	hasMoved: boolean = false;

	constructor(player: Player) {
		this.player = player;
	}

	getAttackingSquares(_board: Board): Square[] {
		throw new Error(
			"This method must be implemented, and return a list of possible attacks",
		);
	}

	getAvailableMoves(_board: Board): Square[] {
		throw new Error(
			"This method must be implemented, and return a list of available moves",
		);
	}

	moveTo(board: Board, newSquare: Square): boolean {
		const currentSquare = board.findPiece(this);
		if (board.movePiece(currentSquare, newSquare)) {
			this.hasMoved = true;
			return true;
		}

		return false;
	}
}
