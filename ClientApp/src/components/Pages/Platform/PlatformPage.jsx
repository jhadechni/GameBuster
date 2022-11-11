import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Table } from '../../reusables/Table';
import { platformTableColumns, platformMapper } from '../../reusables/gridConverter';
import { Link } from 'react-router-dom';
import { Modal } from '../../reusables/Modal';
import { toast, ToastContainer } from 'react-toastify';

export const PlatformPage = observer((props) => {

  useEffect(() => {
    props.platformController.fetchPlatforms()
  }, [])

  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [showModalAsign, setShowModalAsign] = useState(false)


  const ToogleModalCreate = () => {
    setShowModalCreate((prev) => !prev)
  }

  const handleOnSubmitCreate = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.platformController.createPlatform(Object.fromEntries(formData).type)
    e.target.reset()
    ToogleModalCreate()
  }

  const ToogleModalEdit = () => {
    setShowModalEdit((prev) => !prev)
  }

  const handleOnSubmitEdit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.platformController.updatePlatform(Object.fromEntries(formData))
    e.target.reset()
    ToogleModalEdit()
  }

  const ToogleModalDelete = () => {
    setShowModalDelete((prev) => !prev)
  }

  const handleOnSubmitDelete = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.platformController.deletePlatform(Object.fromEntries(formData).platformId)
    e.target.reset()
    ToogleModalDelete()
  }

  const ToogleModalAsign = () => {
    setShowModalAsign((prev) => !prev)
  }

  const handleOnSubmitAsign = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.platformController.addPlatformToAGame(Object.fromEntries(formData))
    e.target.reset()
    ToogleModalAsign()
  }

  return (
    <div>
      <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Platforms</h1>
      <ToastContainer />
      <div className='flex flex-wrap flex-row gap-[6.2rem] md:mx-[10rem] mx-4'>
        <button className='btn btn-primary w-80' onClick={ToogleModalCreate} > Create a platform </button>
        <Modal OnClose={ToogleModalCreate} show={showModalCreate} title='Create a platform'>
          <form onSubmit={handleOnSubmitCreate}>
            <input type="text" name='type' placeholder="Type" className="input input-bordered w-full max-w-xs" key='type' />
            <div className="flex items-center justify-end p-6">
              <label
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={ToogleModalCreate}>
                Cancel
              </label>
              <button
                className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                create
              </button>
            </div>
          </form>
        </Modal>
        <button className='btn btn-primary w-80' onClick={ToogleModalDelete}> delete a platform </button>
        <Modal OnClose={ToogleModalDelete} show={showModalDelete} title='Delete a platform'>
          <form onSubmit={handleOnSubmitDelete}>
            <input type="text" placeholder="Platform id" name='platformId' className="input input-bordered w-full max-w-xs" key={'platformId'} />
            <div className="flex items-center justify-end p-6">
              <label
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={ToogleModalDelete}>
                Close
              </label>
              <button
                className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Delete
              </button>
            </div>
          </form>
        </Modal>
        <button className='btn btn-primary w-80' onClick={ToogleModalEdit}> update a platform </button>
        <Modal OnClose={ToogleModalEdit} show={showModalEdit} title='Update a platform'>
          <form onSubmit={handleOnSubmitEdit}>
            <input type="text" placeholder="Platform id" name='platformId' className="input input-bordered w-full max-w-xs" key={'platformId'} />
            <input type="text" name='type' placeholder="Type" className="input input-bordered w-full max-w-xs" key='type' />
            <div className="flex items-center justify-end p-6">
              <label
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={ToogleModalEdit}>
                Cancel
              </label>
              <button
                className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>

        <button className='btn btn-primary w-80' onClick={ToogleModalAsign}> Asign to a Game </button>
        <Modal OnClose={ToogleModalAsign} show={showModalAsign} title='Update a platform'>
          <form onSubmit={handleOnSubmitAsign}>
            <input type="text" placeholder="Platform id" name='platformId' className="input input-bordered w-full max-w-xs" key={'platformId'} />
            <input type="text" name='gameId' placeholder="Game id" className="input input-bordered w-full max-w-xs" key='gameId' />
            <div className="flex items-center justify-end p-6">
              <label
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={ToogleModalAsign}>
                Cancel
              </label>
              <button
                className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Asign
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="mx-40 pt-10 pb-20">
        <Table data={props.platformController.platforms} columns={platformTableColumns} dataMapper={platformMapper} limit={10} />
      </div>

    </div>
  )
})

