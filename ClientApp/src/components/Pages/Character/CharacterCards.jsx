import CharacterCard from "./CharacterCard"
import { observer } from "mobx-react-lite"

export const CharacterCards = observer(({ characterController }) => {


    const deleteCharacter = async (id) => {
        await characterController.deleteCharacter(id)
        console.log('borré', id)
    }

    const editCharacter = (id, newData) => {
        characterController.updateCharacter(id, newData)
        console.log('edit', id)
    }

    const asignToAGame = (characterId, gameId) => {
        characterController.asignToAGame(characterId, gameId)
    }

    return (
        <div className="flex gap-5 items-center flex-wrap my-10 md:my-12 content-center max-w-full min-w-full px-[6.2rem]">
            {characterController.characters.map((c) => <CharacterCard {...c} key={c.characterId}
                onDelete={deleteCharacter}
                onEdit={editCharacter}
                onAsign={asignToAGame}
            />)}
        </div>
    )
})