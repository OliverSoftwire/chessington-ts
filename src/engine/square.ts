export default class Square {
	row: number;
	col: number;
	constructor(row: number, col: number) {
		this.row = row;
		this.col = col;
	}

	static at(row: number, col: number) {
		return new Square(row, col);
	}

	equals(otherSquare: Square) {
		return (
			!!otherSquare &&
			this.row === otherSquare.row &&
			this.col === otherSquare.col
		);
	}

	toString() {
		return `Row ${this.row}, Col ${this.col}`;
	}
}
