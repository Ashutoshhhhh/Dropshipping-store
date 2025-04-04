import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Cartmodel from '../Shop/Cartmodel';
import avatarimg from '../../assets/avatar.png'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { logOut } from '../../redux/features/auth/authSlice';
const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const proudcts = useSelector((state) => state.cart.products);
    const [isCartOpen, setIsCartopen] = useState(false);
    const [isDropDownOpen, setDropDownMenu] = useState(false);
    const [logoutUser, states] = useLogoutUserMutation();
    const handleDropDown = () => {
        console.log(isDropDownOpen)
        setDropDownMenu(prev => !prev);
    }
    const handleCartToggle = () => {

        setIsCartopen(!isCartOpen);

    }


    // logout
    const handleLogout = async () => {
        try {
            await logoutUser();
            dispatch(logOut());
            navigate('/')
            console.log('logged out successfully');
        }
        catch (err) {
            console.log('error while loggin out');
        }

    }

    const user = useSelector(state => state.auth.user);
    console.log(user, 'i')
    //drop down meny
    const admindropDownMenu = [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Manage Items', path: '/dashboard/manage-products' },
        { label: 'All Orders', path: '/dashboard/manage-orders' },
        { label: 'Add New Post', path: '/dashboard/add-new-post' }
    ]
    const userdropDownMenu = [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Profile', path: '/dashboard/profile' },
        { label: 'Payments', path: '/dashboard/payments' },
        { label: 'Orders', path: '/dashboard/orders' }
    ]
    const dropDownMenu = user?.role === 'admin' ? [...admindropDownMenu] : [...userdropDownMenu];
    console.log(dropDownMenu);
    return (
        <header className='fixed-nav-bar w-nav overflow-x-hidden'>
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
                        {
                            user && user ? <div>
                                <img
                                    onClick={handleDropDown}
                                    className='size-6  rounded-full cursor-pointer'
                                    src={user.profileImage ? user.profileImage : avatarimg} />
                                {
                                    isDropDownOpen && (
                                        <div className='absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                                            <ul className='font-medium space-y-4 p-2'>
                                                {dropDownMenu.map((menu, index) => {
                                                    return <li key={index}>
                                                        <Link
                                                            onClick={() => setDropDownMenu(false)}
                                                            className=' w-full dropdown-items' to={menu.path}>{menu.label}</Link>
                                                    </li>
                                                })}
                                                <li>
                                                    <Link
                                                        onClick={handleLogout}
                                                        className=' w-full dropdown-items' >Log Out</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )

                                }
                            </div> : <Link to="login">
                                <i className="ri-user-line"></i>
                            </Link>
                        }

                    </span>

                </div>
            </nav>
            {

                isCartOpen && <Cartmodel products={proudcts} isOpen={isCartOpen} onClose={handleCartToggle} />
            }

        </header>
    )
}

export default Navbar
