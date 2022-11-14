import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import { Table } from '../../reusables/Table';
import { rentTableColumns, rentMapper } from '../../reusables/gridConverter';

export const DailyRents = observer((props) => {

  useEffect(() => {
    props.rentController.fetchDailyRents()
  }, [])

  return (
    <div>
      <h1 className='text-4xl font-bold text-center md:my-8 my-4'>Daily Rents</h1>
      <div className="mx-40">
        <Table data={props.rentController.dailyRents} columns={rentTableColumns} dataMapper={rentMapper} limit={10} />
      </div>
    </div>

  )
}
)
