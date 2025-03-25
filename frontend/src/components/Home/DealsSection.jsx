import React from 'react'
import deals from '../../assets/deals.png'
const DealsSection = () => {
  return (
    <div className='section__container deals__container'>
        <div className='deals__image'>
            <img src={deals} alt='deals-image' className='z-8 w-fit h-fit'/>
        </div>
        <div className='deals__content z-10'>
            <h5>Get Up To 20% Discount</h5>
            <h4>Deals Of The Month</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, aspernatur animi! Quas distinctio facilis pariatur cum et beatae numquam harum sit rem, obcaecati expedita nostrum officiis? Obcaecati magnam culpa isteadipisicing elit. Porro, aspernatur animi! Quas distinctio facilis pariatur cum et beatae numquam harum sit rem, obcaecati expedita nostrum officiis? Obcaecati magnam culpa iste!</p>
            <div className='deals__countdown flex-wrap'>
                <div className='deals__countdown__card'>
                    <h4>14 </h4>
                    <p>Days</p>

                </div>
                <div className='deals__countdown__card'>
                    <h4>20 </h4>
                    <p>Hrs</p>

                </div>
                <div className='deals__countdown__card'>
                    <h4>14 </h4>
                    <p>Mins</p>

                </div>

            </div>
        
        </div>
      
    </div>
  )
}

export default DealsSection
