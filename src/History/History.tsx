import { Table } from 'antd'
import React, { useEffect } from 'react'

function History() {

    const [data, setData] = React.useState([])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
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
            title: 'Gagnant',
            dataIndex: 'winner',
            key: 'winner',
        }
    ]

    useEffect(() => {
        (async () => {

        })();
    })

  return (
    <Table columns={columns}/>
  )
}

export default History