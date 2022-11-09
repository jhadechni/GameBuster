import { makeAutoObservable } from "mobx"
import axios from "axios"

export class CustomerStore {

    customers = []

    constructor() {
        makeAutoObservable(this)
    }

    async fetchCustomers() {
        try {
            const response = await axios.get('/api/Customers')
            this.customers = response.data
        } catch (error) {
            console.log(error)
        }
    }

    async createCustomer(data) {
        try {
            const response = await axios.post('/api/Customers', {
                cedula: data.cedula,
                name: data.name,
                surname: data.surname,
                dateOfBirth: data.dateOfBirth,
                address: data.address,
            })
            console.log(response.data)
            this.fetchCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    async deleteCustomer(id) {
        try {
            await axios.delete(`/api/Customers/${id}`)
            this.fetchCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    async updateCustomer(newData) {
        try {
            const response = await axios.put(`/api/Customers/${newData.customerId}`, {
                customerId: newData.customerId,
                cedula: newData.cedula,
                name: newData.name,
                surname: newData.surname,
                dateOfBirth: newData.dateOfBirth,
                address: newData.address,
            })
            console.log(response.data)
            this.fetchCustomers()
        } catch (error) {
            console.log(error)
        }
    }

    async fetchFrecuentCustomer() {
        try {
            const response = await axios.get('/api/Customers/GetFrecuentCustomer')
            this.customers = [response.data]
        } catch (error) {
            
        }
    }
}