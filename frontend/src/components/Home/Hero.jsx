import React from 'react'
import card1 from '../../assets/card-1.png'
import card2 from '../../assets/card-2.png'
import card3 from '../../assets/card-3.png'

const cards=[
  {
    id:1,
    image:card1,
    trend:'2025 Trending',
    title:'Blazers'
  },
  {
    id:2,
    image:card2,
    trend:'2025 Trending',
    title:'Dresses'
  },
  {
    id:3,
    image:card3,
    trend:'2025 Trending',
    title:'Business Casuals'
  }

]
const Hero = () => {
  return (
    <div className='section__container hero__container '>
      {
        cards.map((card,index)=>{
          return <div key={index} className='hero__card'>
            <img src={card.image} />
            <div className='hero__content'>
              <p>{card.trend}</p>
              <h4>{card.title}</h4>
              <a href='#'>Discover More</a>
            </div>
          </div>
        })
      }
      
    </div>
  )
}

export default Hero
