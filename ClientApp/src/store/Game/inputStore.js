import { makeAutoObservable } from "mobx"

export class InputStore {

    data = {
        text: '',
        select: '',
        date: '',
        initialAge: '',
        endAge: ''
    }

    dataModal = {
        name: '',
        releaseDate: '',
        director: '',
        producer: '',
        company: '',
        price: 0,
    }

    dataModal2 = {
        name: '',
        releaseDate: '',
        director: '',
        producer: '',
        company: '',
        price: 0,
    }


    constructor() {
        makeAutoObservable(this)
    }

    async OnChange(key, value) {
        this.data[key] = value
        console.log(this.data[key])
    }

    async OnChangeModal(key, value) {
        this.dataModal[key] = value
        console.log(this.dataModal[key])
    }

    async OnChangeModal2(key, value) {
        this.dataModal2[key] = value
        console.log(this.dataModal2[key])
    }

}