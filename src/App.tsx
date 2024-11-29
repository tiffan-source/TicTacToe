import Game from "./Game/Game"
import { Card } from "antd"
import Menu from "./Menu/Menu"
import History from "./History/History"
import { useState } from "react";

function App() {

    const [menuSelection, setMenuSelection] = useState(0);

  return (
    <div className='inline-flex h-screen w-screen justify-center items-center'>
        <Card title="TikTakToe" className='w-[40rem]'>
            {menuSelection === 0 && <Menu setMenuSelection={setMenuSelection}/>}
            {(menuSelection === 1 || menuSelection === 2) && <Game gameType={menuSelection}/>}
            {menuSelection === 3 && <History/>}
        </Card>
    </div>
  )
}

export default App
