import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Table } from '../../reusables/Table';
import { rentTableColumns, rentMapper } from '../../reusables/gridConverter';
import { Link } from 'react-router-dom';
import { Modal } from '../../reusables/Modal';
import { toast, ToastContainer } from 'react-toastify';
export const RentPage = observer((props) => {

  useEffect(() => {
    props.rentController.fetchRents()
  }, [])

  const [showModalEdit, setShowModalEdit] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [showModalDelete, setShowModalDelete] = useState(false)


  const ToogleModalCreate = () => {
    setShowModalCreate((prev) => !prev)
  }

  const handleOnSubmitCreate = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.rentController.createRent(Object.fromEntries(formData))
    e.target.reset()
    ToogleModalCreate()
  }

  const ToogleModalEdit = () => {
    setShowModalEdit((prev) => !prev)
  }

  const handleOnSubmitEdit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.rentController.updateRent(Object.fromEntries(formData))
    e.target.reset()
    ToogleModalEdit()
  }

  const ToogleModalDelete = () => {
    setShowModalDelete((prev) => !prev)
  }

  const handleOnSubmitDelete = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.rentController.deleteRent(Object.fromEntries(formData).rentId)
    e.target.reset()
    ToogleModalDelete()
  }

  //console.log(props.rentController.rents.length)
  return (
    <div>
      <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Rents</h1>
      <ToastContainer/>
      <div className='flex flex-wrap flex-row gap-[6.2rem] md:mx-[10rem] mx-4'>
        <button className='btn btn-primary w-80' onClick={ToogleModalCreate} > Create a rent </button>
        <Modal OnClose={ToogleModalCreate} show={showModalCreate} title='Create a rent'>
          <form onSubmit={handleOnSubmitCreate}>
            <p className='text-white'>Start date</p>
            <input type="date" name='startDate' className="rounded-lg input input-bordered text-white" key='startDate' />
            <p className='text-white'>Return date</p>
            <input type="date" name='returnDate' className="rounded-lg input input-bordered text-white" key='returnDate' />
            <input type="number" name='price' placeholder="Price" className="input input-bordered w-full max-w-xs" key='price' />
            <input type="text" name='customerId' placeholder="Customer Id" className="input input-bordered w-full max-w-xs" key='customerId' />
            <input type="text" name='gameId' placeholder="Game Id" className="input input-bordered w-full max-w-xs" key='gameId' />
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


        <button className='btn btn-primary w-80' onClick={ToogleModalDelete}> delete a rent </button>

        <Modal OnClose={ToogleModalDelete} show={showModalDelete} title='Delete a rent'>
          <form onSubmit={handleOnSubmitDelete}>
            <input type="text" placeholder="Rent id" name='rentId' className="input input-bordered w-full max-w-xs" key={'rentId'} />
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

        <button className='btn btn-primary w-80' onClick={ToogleModalEdit}> update a rent </button>
        <Modal OnClose={ToogleModalEdit} show={showModalEdit} title='Update a rent'>
          <form onSubmit={handleOnSubmitEdit}>
            <input type="text" placeholder="Rent id" name='rentId' className="input input-bordered w-full max-w-xs" key={'rentId'} />
            <p className='text-white'>Start date</p>
            <input type="date" name='startDate' className="rounded-lg input input-bordered text-white" key='startDate' />
            <p className='text-white'>Return date</p>
            <input type="date" name='returnDate' className="rounded-lg input input-bordered text-white" key='returnDate' />
            <input type="number" name='price' placeholder="Price" className="input input-bordered w-full max-w-xs" key='price' />
            <input type="text" name='customerId' placeholder="Customer Id" className="input input-bordered w-full max-w-xs" key='customerId' />
            <input type="text" name='gameId' placeholder="Game Id" className="input input-bordered w-full max-w-xs" key='gameId' />
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

        <Link to='/dailyrents'>
          <button className='btn btn-primary w-80'> Daily rents </button>
        </Link>
      </div>
      <div className="mx-40 pt-10 pb-20">
        <Table data={props.rentController.rents} columns={rentTableColumns} dataMapper={rentMapper} limit={10} />
      </div>

    </div>

  )
})
