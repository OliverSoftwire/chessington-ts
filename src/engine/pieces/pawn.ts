import Board from '../board'
import Player from '../player'
import { Piece } from './piece'
import Square from '../square'

export class Pawn extends Piece {
  constructor(player: Player) {
    super(player)
  }

  getAvailableMoves(board: Board): Square[] {
    const currentSquare = board.findPiece(this)

    const squareInFront = Square.at(
      currentSquare.row + (this.player === Player.WHITE ? 1 : -1),
      currentSquare.col,
    )

    return [ squareInFront ]
  }
}
