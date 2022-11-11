import { makeAutoObservable } from "mobx"
import axios from "axios"
import { updateMessage, deleteMessage, errorMessage, createMessage, genericMessage } from '../../components/reusables/toaster'
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
            errorMessage(error)
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
            createMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async deleteCustomer(id) {
        try {
            const response = await axios.delete(`/api/Customers/${id}`)
            this.fetchCustomers()
            deleteMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
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
            this.fetchCustomers()
            updateMessage(response)
        } catch (error) {
            console.log(error)
            errorMessage(error)
        }
    }

    async fetchFrecuentCustomer() {
        try {
            const response = await axios.get('/api/Customers/GetFrecuentCustomer')
            this.customers = [response.data]
        } catch (error) {
            errorMessage(error)
        }
    }
}