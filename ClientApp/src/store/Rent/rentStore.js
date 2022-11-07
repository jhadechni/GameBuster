import { makeAutoObservable } from "mobx"
import axios from "axios"

export class RentStore {

    rents = []
    dailyRents = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchRents() {
        try {
            const response = await axios.get('/api/Rents')
            this.rents = response.data
        } catch (error) {
            console.log(error)
        }
    }

    async fetchDailyRents() {
        try {
            const response = await axios.get('/api/Rents/DailyRents')
            this.dailyRents = response.data
        } catch (error) {
            console.log(error)
        }
    }

    async createRent(data) {
        try {
            const response = await axios.post('/api/Rents', {
                rentId: data.rentId,
                startDate: data.startDate,
                returnDate: data.returnDate,
                price: data.price,
                gameId: data.gameId,
                customerId: data.customerId,
                gameId : data.gameId
            })
            console.log(response.data)
            this.fetchRents()
        } catch (error) {
            console.log(error)
        }
    }

    async deleteRent(id) {
        try {
            await axios.delete(`/api/Rents/${id}`)
            this.fetchRents()
        } catch (error) {
            console.log(error)
        }
    }

    async updateRent(newData) {
        try {
            const response = await axios.put(`/api/Rents/${newData.rentId}`, {
                rentId: newData.rentId,
                startDate: newData.startDate,
                returnDate: newData.returnDate,
                price: newData.price,
                gameId: newData.gameId,
                customerId: newData.customerId,
                gameId : newData.gameId
            })
            console.log(response.data)
            this.fetchRents()
        } catch (error) {
            console.log(error)
        }
    }
}
