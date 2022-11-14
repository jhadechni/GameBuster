import React from 'react'
import PropTypes from 'prop-types'
import { DeleteModal } from '../../reusables/DeleteModal'
import { useState } from 'react'
import { Modal } from '../../reusables/Modal'
import { toast, ToastContainer } from 'react-toastify';

function CharacterCard(props) {

    const [showModal, setShowModal] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [showModalAsign, setShowModalAsign] = useState(false)

    const ToogleModalDelete = () => {
        setShowModal((prev) => !prev)
    }

    const ToogleModalEdit = () => {
        setShowModalEdit((prev) => !prev)
    }

    const ToogleModalAsign = () => {
        setShowModalAsign((prev) => !prev)
    }


    const OnConfirmDelete = () => {
        console.log(props.characterId)
        ToogleModalDelete()
        props.onDelete(props.characterId)
    }


    const handleOnSubmitEdit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        props.onEdit(props.characterId, Object.fromEntries(formData))
        e.target.reset()
        ToogleModalEdit()
    }


    const handleOnAsign = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        props.onAsign(props.characterId,Object.fromEntries(formData).gameId)
        e.target.reset()
        ToogleModalAsign()
    }

    return (
        <div className="card card-side shadow-xl bg-white">
            <figure><img src={props.image} className="w-[8rem] mx-4 my-8" /></figure>
            <div className="card-body">
                <h1 className="card-title text-2xl font-bold text-black">{props.name}</h1>
                <div className="card-actions flex flex-col flex-wrap">
                    <button className="btn btn-primary" onClick={ToogleModalEdit}>Edit</button>
                    <Modal OnClose={ToogleModalEdit} show={showModalEdit} title='Edit a Character'>
                        <form onSubmit={handleOnSubmitEdit}>
                            <input type="text" placeholder="Name" name='name' className="input input-bordered w-full max-w-xs" key='name' />
                            <div className='pb-5' />
                            <input type="text" name='image' placeholder="Image" className="input input-bordered w-full max-w-xs" key='image' />
                            <div className="flex items-center justify-end p-6">
                                <label
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={ToogleModalEdit}>
                                    Close
                                </label>
                                <button
                                    className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </Modal>
                    <ToastContainer />
                    <button className="btn btn-primary" onClick={ToogleModalDelete}>Delete</button>
                    <DeleteModal OnConfirm={OnConfirmDelete} OnClose={ToogleModalDelete} show={showModal} />
                    <button className="btn btn-primary" onClick={ToogleModalAsign}>Asign to a game</button>
                    <Modal OnClose={ToogleModalAsign} show={showModalAsign} title='Asign to a game'>
                        <form onSubmit={handleOnAsign}>
                            <input type="text" placeholder="Game id" name='gameId' className="input input-bordered w-full max-w-xs" key='gameId' />
                            <div className="flex items-center justify-end p-6">
                                <label
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    onClick={ToogleModalAsign}>
                                    cancel
                                </label>
                                <button
                                    className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                >
                                    ASIGN
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard