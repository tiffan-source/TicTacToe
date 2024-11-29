import { Card, Flex, Button } from 'antd'

function Menu({setMenuSelection}: {setMenuSelection: (value: number) => void}) {

    const menu = [
        {
            title: 'Nouvelle partie',
            onClick: () => setMenuSelection(1)
        },
        {
            title: 'Charger une partie',
            onClick: () => setMenuSelection(2)
        },
        {
            title: 'Historique',
            onClick: () => setMenuSelection(3)
        }
    ]

  return (
        <Flex vertical={true} gap="large">
            {menu.map((item, index) => (
                <Button type={index === 0 ? "primary" : "default"} key={index} onClick={item.onClick}>
                    {item.title}
                </Button>
            ))}
        </Flex>
  )
}

export default Menu