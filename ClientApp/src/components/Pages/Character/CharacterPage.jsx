import React, { useEffect, useState } from 'react'
import { Modal } from '../../reusables/Modal'
import { CharacterCards } from './CharacterCards'
import Loader from '../../reusables/Loader'

export const CharacterPage = (props) => {

  useEffect(() => {
    props.characterController.fetchCharacters()
  }, [])

  const [showModal, setShowModal] = useState(false)

  const ToogleModal = () => {
    setShowModal((prev) => !prev)
  }

  const createACharacter = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.characterController.createCharacter(Object.fromEntries(formData))
    e.target.reset()
    ToogleModal()
  }

  return (
    <div>
      <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Characters</h1>
      <button className="btn btn-primary mx-[6.5rem]" onClick={ToogleModal}>Create a character</button>
      <Modal OnClose={ToogleModal} show={showModal} title='Create a Character'>
        <form onSubmit={createACharacter}>
          <input type="text" placeholder="Name" name='name' className="input input-bordered w-full max-w-xs" key='name' />
          <div className='pb-5' />
          <input type="text" name='image' placeholder="Image" className="input input-bordered w-full max-w-xs" key='image' />
          <div className="flex items-center justify-end p-6">
            <label
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              onClick={ToogleModal}>
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
      <CharacterCards characterController={props.characterController} />
    </div>
  )
}

