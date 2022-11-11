import React from 'react'
import { Link, Route } from 'react-router-dom'

function Home() {
    return (
        <div className='flex flex-wrap gap-8 md:my-[20rem] mx-20'>

            <Link to='/games'>
                <button className='btn btn-primary w-80 h-20'> View Games </button>
            </Link>

            <Link to="/rent">
                <button className='btn btn-primary w-80 h-20'> View rents </button>
            </Link>

            <Link to='/customers'>
                <button className='btn btn-primary w-80 h-20'> View customers </button>
            </Link>

            <Link to='/character'>
                <button className='btn btn-primary w-80 h-20'> View characters </button>
            </Link>

            <Link to='/platforms'>
                <button className='btn btn-primary w-80 h-20'> View platforms </button>
            </Link>

            



        </div>
    )
}

export default Home