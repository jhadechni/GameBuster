import React from 'react'
import PropTypes from 'prop-types'
import { DeleteModal } from '../../reusables/DeleteModal'
import { useState } from 'react'
import { Modal } from '../../reusables/Modal'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function GameCard(props) {

    const [showModal, setShowModal] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)

    const ToogleModal = () => {
        setShowModal((prev) => !prev)
    }

    const ToogleModalEdit = () => {
        setShowModalEdit((prev) => !prev)
    }

    const OnConfirm = async () => {
        console.log(props.gameId)
        ToogleModal()
        await props.onDelete(props.gameId)
        
    }


    const handleOnSubmitEdit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        props.onEdit(props.gameId, Object.fromEntries(formData))
        e.target.reset()
        ToogleModalEdit()
    }


    return (
        <div className="card w-96 bg-white shadow-xl">
            <div className="card-body text-black">
                <h2 className="card-title font-bold">{props.name}
                    <div className="badge badge-primary">{props.company}</div>
                </h2>
                <p><b>Producer: </b>{props.producer}</p>
                <p><b>Director: </b>{props.director}</p>
                <p><b>Release date:</b> {new Date(props.releaseDate).toLocaleDateString()}</p>
                <p><b>Platforms: </b>{props.platforms.length > 0 ? props.platforms.join(', ') : 'ANY'}</p>
                <p><b>Characters: </b>{props.characters.length > 0 ? props.characters.join(', ') : 'ANY'}</p>
                <p><b>Price:</b> <kbd className='kbd text-white'>{props.price === 0 ? 'FREE' : props.price}</kbd></p>

                <div className="card-actions justify-end">
                    <label htmlFor="delete-modal" className="btn btn-primary" onClick={ToogleModal}>delete</label>
                    <DeleteModal OnConfirm={OnConfirm} OnClose={ToogleModal} show={showModal} />
                    <ToastContainer />
                    <label htmlFor="delete-modal" className="btn" onClick={ToogleModalEdit}>edit</label>

                    <Modal OnClose={ToogleModalEdit} show={showModalEdit} title='Edit a game'>
                        <form onSubmit={handleOnSubmitEdit}>
                            <input type="text" placeholder="Name" name='name' className="input input-bordered w-full max-w-xs" key={'name'} />
                            <p className='text-white'>Release date</p>
                            <input type="date" name='releaseDate' className="rounded-lg input input-bordered text-white" key='releaseDate' />
                            <input type="text" name="director" placeholder="Director" className="input input-bordered w-full max-w-xs" key='director' />
                            <input type="text" name='producer' placeholder="Producer" className="input input-bordered w-full max-w-xs" key='producer' />
                            <input type="text" name='company' placeholder="Company" className="input input-bordered w-full max-w-xs" key='company' />
                            <input type="number" name='price' placeholder="Price" className="input input-bordered w-full max-w-xs" key='price' />
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
                </div>

            </div>
        </div>
    )
}

GameCard.propTypes = {
    name: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    platforms: PropTypes.any,
    company: PropTypes.string.isRequired
}

export default GameCard