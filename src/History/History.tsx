import { Button, Table } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'

function History() {

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
        // {
        //     title: 'Date',
        //     dataIndex: 'date',
        //     key: 'date',
        // },
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
            title: 'Gagnant',
            dataIndex: 'winner',
            key: 'winner',
        }
    ]

    useEffect(() => {
        (async () => {
            const data = await axios.get('http://localhost:5000/tictactoe');

            const result = [];

            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                if(element.status !== 3)
                {
                    result.push({
                        id: element._id,
                        // date: element.date,
                        player1: element.player1,
                        player2: element.player2,
                        winner: element.staus === 1 ? element.player1 : element.player2
                    })
                }
            }
            
            setData(result);
        })();
    }, []);

  return (
    <>
        <Table columns={columns} dataSource={data}/>
        <div>
            <Button className="w-full" type="primary" onClick={()=>{reload()}}>Menue pincipale</Button>
        </div>

    </>
  )
}

export default History