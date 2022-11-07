import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Table } from '../../reusables/Table';
import { customerTableColumns, customerMapper } from '../../reusables/gridConverter';

export const CustomerPage = observer((props) => {

  useEffect(() => {
    props.customerController.fetchCustomers()
  }, [])

  return (
    <div>
      <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Customers</h1>
      <div className="mx-40">
        <Table data={props.customerController.customers} columns={customerTableColumns} dataMapper={customerMapper} limit={10} />
      </div>
    </div>
  )
})
