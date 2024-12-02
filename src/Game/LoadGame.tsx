import { Button, Table } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react'

function LoadGame({loadGame}: {loadGame: (joueur1: string, joueur2: string, id: number, turn: number, status: number, board: Array<string>) => void}) {

    const [data, setData] = React.useState<Array<any>>([])


    const reload =  () => {
        window.location.reload();
    }
  

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Joueur 1',
            dataIndex: 'player1',
            key: 'player1',
        },
        {
            title: 'Joueur 2',
            dataIndex: 'player2',
            key: 'player2',
        },
        {
            title: 'Tour',
            dataIndex: 'turn',
            key: 'turn',
        }
    ]

    useEffect(() => {
        (async () => {
            const data = await axios.get('http://localhost:5000/tictactoe');

            const result = [];

            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                if(element.status === 3)
                {
                    result.push({
                        id: element._id,
                        // date: element.date,
                        player1: element.player1,
                        player2: element.player2,
                        turn: element.turn === 0 ? element.player1 : element.player2,
                        board: element.board,
                    })
                }
            }
            
            setData(result);
        })();
    }, []);

    const setUpGame = (id: string) => {
        const game = data.find((game) => game.id === id);
        console.log(game)
        loadGame(game.player1, game.player2, game.id, 
            game.turn === game.player1 ? 0 : 1
            , 3, game.board);
    }

  return (
    <>
        <Table columns={columns} dataSource={data}
        onRow={(record)=>{
            return {
                onClick: () => {
                    setUpGame(record.id)
                }
            }
        }}/>
        <div>
            <Button className="w-full" type="primary" onClick={()=>{reload()}}>Menue pincipale</Button>
        </div>

    </>
  )
}

export default LoadGame