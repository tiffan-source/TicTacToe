import { Button, Form, Input } from 'antd'
import React from 'react'

function NewGame({newGame}: {newGame: (joueur1: string, joueur2: string) => void}) {
    const onFinish = (values: any) => {
        newGame(values.joueur1, values.joueur2)
    }

  return (
    <Form
    size='large'
    onFinish={onFinish}
    >
        <Form.Item name="joueur1" label="Joueur 1" rules={[{required: true}]}>
            <Input/>
        </Form.Item>
        <Form.Item name="joueur2" label="Joueur 2"  rules={[{required: true}]}>
            <Input/>
        </Form.Item>
        <Form.Item>
            <Button type='primary' htmlType='submit'>
                Nouvelle partie
            </Button>
        </Form.Item>
    </Form>
  )
}

export default NewGame