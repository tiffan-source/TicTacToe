import React, { useState } from 'react'
import NewGame from './NewGame'
import Board from './Board'
import LoadGame from './LoadGame'

export type GameType = {
    gameType: number,
    joueur1: string,
    joueur2: string,
    id: number,
    status: number,
    winner: number,
    board: Array<string>
}

function Game({gameType}: {gameType: number}) {
    const [game, setGame] = useState<GameType | null>(null);

    const newGame = (joueur1: string, joueur2: string) => {
        setGame({
            gameType: 1,
            joueur1,
            joueur2,
            id: 1,
            status: 0,
            winner: 0,
            board: []
        })
    }

  return (
    <div>
        {!game && gameType === 1 && <NewGame newGame={newGame}/>}
        {!game &&gameType === 2 && <LoadGame />}
        {game && <Board game={game}/>}
    </div>
  )
}

export default Game