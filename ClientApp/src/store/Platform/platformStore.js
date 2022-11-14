import { makeAutoObservable } from "mobx"
import axios from "axios"
import { updateMessage, deleteMessage, errorMessage, createMessage, genericMessage } from '../../components/reusables/toaster'

export class PlatformStore {

    platforms = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchPlatforms() {
        try {
            const response = await axios.get('/api/Platforms')
            this.platforms = response.data
        } catch (error) {
            errorMessage(error)
        }
    }

    async createPlatform(type) {
        try {
            const response = await axios.post('/api/Platforms', { type: type })
            createMessage(response)
            this.fetchPlatforms()
        } catch (error) {
            errorMessage(error)
        }
    }

    async deletePlatform(id) {
        try {
            const response = await axios.delete(`/api/Platforms/${id}`)
            deleteMessage(response)
            this.fetchPlatforms()
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async updatePlatform(data) {
        try {
            const response = await axios.put(`/api/Platforms/${data.platformId}`, {
                platformId: parseInt(data.platformId),
                type: data.type
            })
            updateMessage(response)
            this.fetchPlatforms()
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async addPlatformToAGame(data) {
        try {
            const response = await axios.put(`/api/Games/${data.gameId}/AddPlatform/${data.platformId}`)
            response.status == 200 ? genericMessage(`Platform asigned to a game with id ${data.gameId} sucefully`) : genericMessage(response.statusText)
        } catch (error) {
            error.response.status === 409 ? errorMessage("Platform already in the game") :
                errorMessage(error)
        }
    }
}