import React, { useState } from 'react'
import NewGame from './NewGame'
import Board from './Board'
import LoadGame from './LoadGame'

export type GameType = {
    gameType: number,
    joueur1: string,
    joueur2: string,
    id: number | null,
    turn: number,
    status: number,
    board: Array<string>
}

function Game({gameType}: {gameType: number}) {
    const [game, setGame] = useState<GameType | null>(null);

    const newGame = (joueur1: string, joueur2: string) => {
        setGame({
            gameType: 1,
            joueur1,
            joueur2,
            id: null,
            turn: 0,
            status: 0,
            board: []
        })
    }

    const loadGame = (joueur1: string, joueur2: string, id: number, turn: number, status: number, board: Array<string>) => {
        setGame({
            gameType: 2,
            joueur1,
            joueur2,
            id,
            turn,
            status,
            board
        })
    }

  return (
    <div>
        {!game && gameType === 1 && <NewGame newGame={newGame}/>}
        {!game &&gameType === 2 && <LoadGame loadGame={loadGame}/>}
        {game && <Board game={game}/>}
    </div>
  )
}

export default Game