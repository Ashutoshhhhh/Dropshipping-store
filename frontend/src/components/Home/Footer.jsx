import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-100 mt-10 '>
    <footer className='section__container   footer__container bg-gray-100'>
        <div className='footer__col'>
            <h4>CONTACT INFO</h4>
            <p>
                <span>
                <i className="ri-map-pin-line"></i></span>
                MSR Mansion Marathalli
            </p>
            <p>
                <span>
                <i className="ri-mail-line"></i></span>
               ashutoshh@gmail.com
            </p>
            <p>
                <span>
                <i className="ri-smartphone-line"></i></span>
               23321333
            </p>

        </div>
        <div className='footer__col'>
            <h4>COMPANY</h4>
            <a>Home</a>
            <a>About Us</a>
            <a>Work With Us</a>
            <a>Our Blogs</a>
            <a>Terms And Condition</a>

        </div>
        <div className='footer__col'>
            <h4>USEFUL LINKS</h4>
            <a>Help</a>
            <a>Track Your Order</a>
            <a>Contact Us</a>
            
            

        </div>

    </footer>
    <div className='text-center mb-2 text-md'>
        Copyright © 2025 Web Design, All Rights Reserved
    </div>
    </div>
  )
}

export default Footer
