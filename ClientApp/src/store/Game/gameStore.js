import { makeAutoObservable } from "mobx"
import axios from "axios"
import { updateMessage, deleteMessage, errorMessage, createMessage } from '../../components/reusables/toaster'
export class GameStore {

    games = []
    isLoading = true

    constructor() {
        makeAutoObservable(this)
    }

    async fetchGames() {
        this.isLoading = true
        try {
            const response = await axios.get('/api/Games')
            this.games = response.data

        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
        finally { this.isLoading = false }

    }

    async fetchMostRentedGame() {
        try {
            const response = await axios.get('/api/Games/GetFrecuentGame')
            this.games = [response.data]
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async fetchGameWithProducer(producer) {
        try {
            const response = await axios.get('/api/Games/GetGameWithProducer', { params: { producer: producer } })
            this.games = response.data

        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async fetchGameWithCharacter(character) {
        try {
            console.log(character)
            const characterArray = character.split(',')
            const params = new URLSearchParams()
            characterArray.forEach((e) => { params.append('characters', e) })
            const response = await axios.get(`/api/Games/GetGameWithCharacters?${params.toString()}`)
            this.games = response.data

        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async fetchGameWithDirector(director) {
        try {
            const response = await axios.get('/api/Games/GetGameWithDirector', { params: { director: director } })
            this.games = response.data

        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async fetchGameReleaseDate(releaseDate) {
        try {
            const response = await axios.get('/api/Games/GetGameReleaseDate', { params: { date: releaseDate } })
            this.games = response.data
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async fetchGamesAgeRange(initialAge, endAge) {
        try {
            const response = await axios.get('api/Games/GetLeastRentedGameByYears', { params: { initialAge: initialAge, endAge: endAge } })
            console.log(response.status)
            this.games = [response.data]
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async deleteGame(id) {
        try {
            const response = await axios.delete('/api/Games/'.concat(id))
            this.games = this.games.filter(g => g.gameId !== id)
            deleteMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async updateGames(id, newData) {
        try {
            const response = await axios.put(`/api/Games/${id}`, {
                gameId: id,
                name: newData.name,
                releaseDate: newData.releaseDate,
                director: newData.director,
                producer: newData.producer,
                company: newData.company,
                price: newData.price
            })
            this.fetchGames()
            updateMessage(response)

        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async createGame(data) {
        try {
            const response = await axios.post('/api/Games', {
                name: data.name,
                releaseDate: data.releaseDate,
                director: data.director,
                producer: data.producer,
                company: data.company,
                price: data.price
            })
            console.log(response.data)
            this.fetchGames()
            createMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }

    }

}
