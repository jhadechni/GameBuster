import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="navbar bg-primary h-20 rounded-b-xl">
                <div className="navbar-start">
                </div>
                <div className="navbar-center">
                    <Link to='/' className='btn btn-ghost normal-case text-4xl text-black'>
                        GameBuster
                    </Link>

                </div>
                <div className="navbar-end">
                    <div className="avatar">
                        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mx-10">
                            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header