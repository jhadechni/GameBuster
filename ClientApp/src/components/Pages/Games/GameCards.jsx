import GameCard from "./GameCard"
import { observer } from "mobx-react-lite"

export const GameCards = observer(({ gameController }) => {

    
    const deleteGame = (id) => {
        gameController.deleteGame(id)
        console.log('borré', id)
    }

    //TODO: implement edit game
    const editGame = (id, newData) => {
        gameController.updateGames(id,JSON.parse(JSON.stringify(newData)))
        console.log('edit', id)
    }

    return (
        <div className="flex gap-5 items-center flex-wrap md:mx-[9rem] mx-4 my-10 md:my-12 content-center">
            {gameController.games.map((g) => <GameCard {...g} key={g.gameId} onDelete={deleteGame} onEdit={editGame} />)}
        </div>
    )
})