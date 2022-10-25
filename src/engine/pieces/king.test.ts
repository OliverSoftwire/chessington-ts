import "jest-extended";

import Board from "../board";
import Player from "../player";
import Square from "../square";
import { King } from "./king";
import { Knight } from "./knight";
import { Pawn } from "./pawn";
import { Queen } from "./queen";
import { Rook } from "./rook";

describe("King", () => {
	let board: Board;
	beforeEach(() => (board = new Board()));

	it("can move to adjacent squares", () => {
		const king = new King(Player.WHITE);
		board.setPiece(Square.at(3, 4), king);

		const moves = king.getAvailableMoves(board);

		const expectedMoves = [
			Square.at(2, 3),
			Square.at(2, 4),
			Square.at(2, 5),
			Square.at(3, 5),
			Square.at(4, 5),
			Square.at(4, 4),
			Square.at(4, 3),
			Square.at(3, 3),
		];

		expect(moves).toEqual(expect.arrayContaining(expectedMoves));
	});

	it("cannot make any other moves", () => {
		const king = new King(Player.WHITE);
		board.setPiece(Square.at(3, 4), king);

		const moves = king.getAvailableMoves(board);

		expect(moves).toHaveLength(8);
	});

	it("cannot leave the board", () => {
		const king = new King(Player.WHITE);
		board.setPiece(Square.at(0, 0), king);

		const moves = king.getAvailableMoves(board);

		const expectedMoves = [
			Square.at(0, 1),
			Square.at(1, 1),
			Square.at(1, 0),
		];

		expect(moves).toIncludeSameMembers(expectedMoves);
	});

	it("can take opposing pieces", () => {
		const king = new King(Player.WHITE);
		const opposingPiece = new Pawn(Player.BLACK);
		board.setPiece(Square.at(4, 4), king);
		board.setPiece(Square.at(5, 5), opposingPiece);

		const moves = king.getAvailableMoves(board);

		expect(moves).toContainEqual(Square.at(5, 5));
	});

	it("cannot take the opposing king", () => {
		const king = new King(Player.WHITE);
		const opposingKing = new King(Player.BLACK);
		board.setPiece(Square.at(4, 4), king);
		board.setPiece(Square.at(5, 5), opposingKing);

		const moves = king.getAvailableMoves(board);

		expect(moves).not.toContainEqual(Square.at(5, 5));
	});

	it("cannot take friendly pieces", () => {
		const king = new King(Player.WHITE);
		const friendlyPiece = new Pawn(Player.WHITE);
		board.setPiece(Square.at(4, 4), king);
		board.setPiece(Square.at(5, 5), friendlyPiece);

		const moves = king.getAvailableMoves(board);

		expect(moves).not.toContainEqual(Square.at(5, 5));
	});

	describe("check", () => {
		it("cannot move into check", () => {
			const king = new King(Player.WHITE);
			const opposingPawn = new Pawn(Player.BLACK);
			board.setPiece(new Square(4, 5), king);
			board.setPiece(new Square(6, 7), opposingPawn);

			const moves = king.getAvailableMoves(board);

			expect(moves).not.toContainEqual(new Square(5, 6));
		});

		it("cannot take piece if piece is protected", () => {
			const king = new King(Player.WHITE);
			const opposingKnight = new Knight(Player.BLACK);
			const opposingQueen = new Queen(Player.BLACK);

			board.setPiece(new Square(4, 5), king);
			board.setPiece(new Square(5, 6), opposingKnight);
			board.setPiece(new Square(7, 4), opposingQueen);

			const expectedMoves = [
				new Square(5, 5),
				new Square(4, 6),
				new Square(3, 6),
			];

			const moves = king.getAvailableMoves(board);

			expect(moves).toIncludeSameMembers(expectedMoves);
		});
	});

	describe("castling", () => {
		it("can castle kingside", () => {
			const king = new King(Player.WHITE);
			const rook = new Rook(Player.WHITE);
			board.setPiece(new Square(0, 4), king);
			board.setPiece(new Square(0, 7), rook);

			const moves = king.getAvailableMoves(board);

			expect(moves).toContainEqual(new Square(0, 6));
		});

		it("can castle queenside", () => {
			const king = new King(Player.WHITE);
			const rook = new Rook(Player.WHITE);
			board.setPiece(new Square(0, 4), king);
			board.setPiece(new Square(0, 0), rook);

			const moves = king.getAvailableMoves(board);

			expect(moves).toContainEqual(new Square(0, 2));
		});

		it("cannot castle if the rook has moved", () => {
			const king = new King(Player.WHITE);
			const rook = new Rook(Player.WHITE);
			board.setPiece(new Square(0, 4), king);
			board.setPiece(new Square(0, 1), rook);
			rook.moveTo(board, new Square(0, 0));

			const moves = king.getAvailableMoves(board);

			expect(moves).not.toContainEqual(new Square(0, 2));
		});

		it("cannot castle if a piece is between the king and rook", () => {
			const king = new King(Player.WHITE);
			const rook = new Rook(Player.WHITE);
			const knight = new Knight(Player.WHITE);
			board.setPiece(new Square(0, 4), king);
			board.setPiece(new Square(0, 0), rook);
			board.setPiece(new Square(0, 1), knight);

			const moves = king.getAvailableMoves(board);

			expect(moves).not.toContainEqual(new Square(0, 2));
		});

		it("cannot castle if the king is in check", () => {
			const king = new King(Player.WHITE);
			const rook = new Rook(Player.WHITE);
			const opposingRook = new Rook(Player.BLACK);
			board.setPiece(new Square(0, 4), king);
			board.setPiece(new Square(0, 0), rook);
			board.setPiece(new Square(7, 4), opposingRook);

			const moves = king.getAvailableMoves(board);

			expect(moves).not.toContainEqual(new Square(0, 2));
		});

		it("cannot castle if king passes through attacked square", () => {
			const king = new King(Player.WHITE);
			const rook = new Rook(Player.WHITE);
			const opposingRook = new Rook(Player.BLACK);
			board.setPiece(new Square(0, 4), king);
			board.setPiece(new Square(0, 0), rook);
			board.setPiece(new Square(7, 3), opposingRook);

			const moves = king.getAvailableMoves(board);

			expect(moves).not.toContainEqual(new Square(0, 2));
		});
	});
});
