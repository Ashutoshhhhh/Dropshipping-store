import React from 'react'
import { Link } from 'react-router-dom'
import header from '../../assets/header.png'
const Banner = () => {
  return (
    <div className='section__container header__container overflow-x-hidden'>
        <div className='header__content z-30 sm:text-white'>
            <h4 className='uppercase'>Up To 20% Discount on</h4>
            <h1>Girl's Fashion</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis quibusdam dignissimos aut tempora ratione unde! Ipsa, corrupti fugiat repellendus reiciendis, beatae esse ipsum nobis iure nihil asperiores natus veritatis. Vel.</p>
            <button className='btn hover:scale-110 transition-all duration-200'><Link to="/shop" >Explore Now</Link></button>
        </div>
        <div className='header__image'>
            <img src={header} alt='img'/>
        </div>
      
    </div>
  )
}

export default Banner
