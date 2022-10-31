import React from 'react'
import { Link, Route } from 'react-router-dom'

function Home() {
    return (
        <div className='flex flex-wrap gap-6 md:my-[20rem]'>

            <Link to='/games'>
                <button className='btn btn-primary w-80'> View Games </button>
            </Link>

            <Link to="/dailyRents">
                <button className='btn btn-primary w-80'> View daily rents </button>
            </Link>

            <Link to='/customers'>
                <button className='btn btn-primary w-80'> View customers </button>
            </Link>

            <Link to='/platforms'>
                <button className='btn btn-primary w-80'> View platforms </button>
            </Link>

            <Link to='/character'>
                <button className='btn btn-primary w-80'> View characters </button>
            </Link>



        </div>
    )
}

export default Home