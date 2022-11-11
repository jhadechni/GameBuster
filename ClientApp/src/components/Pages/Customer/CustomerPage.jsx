import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { Table } from '../../reusables/Table';
import { customerTableColumns, customerMapper } from '../../reusables/gridConverter';
import { Link } from 'react-router-dom';
import { Modal } from '../../reusables/Modal';
import { toast, ToastContainer } from 'react-toastify';

export const CustomerPage = observer((props) => {

  useEffect(() => {
    props.customerController.fetchCustomers()
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
    props.customerController.createCustomer(Object.fromEntries(formData))
    e.target.reset()
    ToogleModalCreate()
  }

  const ToogleModalEdit = () => {
    setShowModalEdit((prev) => !prev)
  }

  const handleOnSubmitEdit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.customerController.updateCustomer(Object.fromEntries(formData))
    e.target.reset()
    ToogleModalEdit()
  }

  const ToogleModalDelete = () => {
    setShowModalDelete((prev) => !prev)
  }

  const handleOnSubmitDelete = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    props.customerController.deleteCustomer(Object.fromEntries(formData).id)
    e.target.reset()
    ToogleModalDelete()
  }

  const handleOnFrecuent = () => {
    props.customerController.fetchFrecuentCustomer()
  }

  const handleOnAllCustomers = () => {
    props.customerController.fetchCustomers()
  }

  return (
    <div>
      <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Customers</h1>
      <ToastContainer/>
      <div className='flex flex-wrap gap-7 md:mx-[10rem] my-8'>

        <button className='btn btn-primary w-70' onClick={handleOnAllCustomers}> View All Customers </button>
        
        <button className='btn btn-primary w-70' onClick={handleOnFrecuent}> View Frecuent Customer </button>


        <button className='btn btn-primary w-70' onClick={ToogleModalCreate}> Create Customer </button>
        <Modal OnClose={ToogleModalCreate} show={showModalCreate} title='Create a customer'>
          <form onSubmit={handleOnSubmitCreate}>
            <input type="text" name='cedula' placeholder="Cedula" className="input input-bordered w-full max-w-xs" key='cedula' />
            <input type="text" name='name' placeholder="Name" className="input input-bordered w-full max-w-xs" key='name' />
            <input type="text" name='surname' placeholder="Surname" className="input input-bordered w-full max-w-xs" key='surname' />
            <p className='text-white'>Date of Birth</p>
            <input type="date" name='dateOfBirth' className="rounded-lg input input-bordered text-white" key='dateOfBirth' />
            <input type="address" name='address' placeholder="Address" className="input input-bordered w-full max-w-xs" key='address' />
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
        

        <button className='btn btn-primary w-70' onClick={ToogleModalEdit}> Update a customer </button>
        <Modal OnClose={ToogleModalEdit} show={showModalEdit} title='Update a customer'>
          <form onSubmit={handleOnSubmitEdit}>
            <input type="text" name='customerId' placeholder="Customer Id" className="input input-bordered w-full max-w-xs" key='customerId' />
            <input type="text" name='cedula' placeholder="Cedula" className="input input-bordered w-full max-w-xs" key='cedula' />
            <input type="text" name='name' placeholder="Name" className="input input-bordered w-full max-w-xs" key='name' />
            <input type="text" name='surname' placeholder="Surname" className="input input-bordered w-full max-w-xs" key='surname' />
            <p className='text-white'>Date of Birth</p>
            <input type="date" name='dateOfBirth' className="rounded-lg input input-bordered text-white" key='dateOfBirth' />
            <input type="address" name='address' placeholder="Address" className="input input-bordered w-full max-w-xs" key='address' />
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
                update
              </button>
            </div>
          </form>
        </Modal>

        <button className='btn btn-primary w-70' onClick={ToogleModalDelete}> Delete Customer </button>
        <Modal OnClose={ToogleModalDelete} show={showModalDelete} title='Delete a client'>
          <form onSubmit={handleOnSubmitDelete}>
            <input type="text" placeholder="Client id" name='id' className="input input-bordered w-full max-w-xs" key={'id'} />
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



      </div>
      <div className="mx-40 my-8 pb-32">
        <Table data={props.customerController.customers} columns={customerTableColumns} dataMapper={customerMapper} limit={10} />
      </div>
    </div>
  )
})
