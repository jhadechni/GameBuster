import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="navbar bg-primary h-20 rounded-b-xl">
                <div className="navbar-start">
                    <div className="w-1/5 mx-10">
                        <img src="https://www.eafit.edu.co/institucional/alianza-4u/PublishingImages/Logo-UNINORTE.png" />
                    </div>
                </div>
                <div className="navbar-center">
                    <Link to='/' className='btn btn-ghost normal-case text-4xl text-black'>
                        GameBuster
                    </Link>

                </div>
                <div className="navbar-end">
                    <div className="w-1/5 mx-10">
                        <img src="https://academy.sophossolutions.com/pluginfile.php/1/theme_lambda/logo/1661175585/MicrosoftTeams-image%20%282%29.png" />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header