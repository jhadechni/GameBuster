import { makeAutoObservable } from "mobx"
import axios from "axios"
import { updateMessage, deleteMessage, errorMessage, createMessage, genericMessage } from '../../components/reusables/toaster'

export class CharacterStore {

    characters = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchCharacters() {
        try {
            const response = await axios.get('/api/Characters')
            this.characters = response.data
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async updateCharacter(id, newData) {
        try {
            const response = await axios.put(`/api/Characters/${id}`, {
                characterId: id,
                name: newData.name,
                image: newData.image
            })
            this.fetchCharacters()
            updateMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async deleteCharacter(id) {
        try {
            const response = await axios.delete(`/api/Characters/${id}`)
            this.fetchCharacters()
            deleteMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(`${error.response.status} Character is linked with games`)
        }
    }

    async asignToAGame(id, game) {
        try {
            const response = await axios.put(`/api/Games/${game}/AddCharacter/${id}`)
            response.status == 200 ? genericMessage(`Character asigned to a game with id ${game} sucefully`) : genericMessage(response.statusText)
        } catch (error) {
            error.response.status === 409 ? errorMessage("Character already in the game") :
                errorMessage(error)
        }
    }

    async createCharacter(data) {
        try {
            const response = await axios.post('/api/Characters/', {
                name: data.name,
                image: data.image
            })
            createMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

}