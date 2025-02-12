import Board from "./board";
import { Pawn } from "./pieces";
import Player from "./player";
import Square from "./square";

describe("Board", () => {
	describe("pawns", () => {
		let board: Board;
		beforeEach(() => {
			// Common code executed before each test.
			board = new Board();
		});

		it("can be added to the board", () => {
			// Arrange
			const pawn = new Pawn(Player.WHITE);
			const square = Square.at(0, 0);

			// Act
			board.setPiece(square, pawn);

			// Assert
			expect(board.getPiece(square)).toEqual(pawn); // Object equality: same object reference
		});

		it("can be found on the board", () => {
			// Arrange
			const pawn = new Pawn(Player.WHITE);
			const square = Square.at(6, 4);

			// Act
			board.setPiece(square, pawn);

			// Assert
			expect(board.findPiece(pawn)).toEqual(square); // Object equivalence: different objects, same data
		});
	});
});
