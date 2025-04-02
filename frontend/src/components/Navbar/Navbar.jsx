import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import Cartmodel from '../Shop/Cartmodel';

const Navbar = () => {
    
    const proudcts = useSelector((state) => state.cart.products);
    const [isCartOpen,setIsCartopen]=useState(false);
    const handleCartToggle=()=>{
        
        setIsCartopen(!isCartOpen);
        console.log(isCartOpen)
    }

    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                <ul className='nav__links'>
                    <li> <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-black hover:text-primary'} to="/">Home</NavLink> </li>
                    <li> <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-black hover:text-primary'} to="/shop">Shop</NavLink> </li>
                    <li> <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-black hover:text-primary'} to="/pages">Pages</NavLink> </li>
                    <li> <NavLink className={({ isActive }) => isActive ? 'text-primary font-bold' : 'text-black hover:text-primary'} to="/contact">Contact</NavLink> </li>

                </ul>

                <div className='nav__logo'>
                    <Link to="/">ZipZapZoo<span>.</span></Link>
                </div>

                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span>
                        <button 
                            onClick={handleCartToggle}
                            className='hover:text-primary'>
                            <i className="ri-shopping-bag-line"></i>
                            <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{proudcts.length}</sup>
                        </button>
                    </span>
                    <span>
                        <Link to="login">
                            <i className="ri-user-line"></i>
                        </Link>
                    </span>

                </div>
            </nav>
            {
                
                 isCartOpen && <Cartmodel products={proudcts} isOpen={isCartOpen} onClose={handleCartToggle}/>
            }

        </header>
    )
}

export default Navbar
