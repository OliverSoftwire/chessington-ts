export interface Position {
	[key: string]: string | undefined
}

type Fen = string

type Orientation = "white" | "black"

export interface ChessBoardConfig {}

export interface Chessboard {
	clear(useAnimation): void
	destroy(): void
	fen(): Fen
	flip(): Orientation
	move(...args: (Fen | Position)[]): Fen | Position
	orientation(arg?: "white" | "black" | "flip"): Orientation
	position(position?: Fen | Position, useAnimation?: boolean): void
	resize(): void
	start(useAnimation?: boolean): void
}

export type ChessboardConstructor = (
	containerElOrString: string,
	config: { [key: string]: any } | ChessBoardConfig,
) => Chessboard
