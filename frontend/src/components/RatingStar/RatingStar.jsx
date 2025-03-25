import React from 'react'

const RatingStar = ({rating}) => {
    const stars=[];
    for(let i=1;i<=5 ;i++){
        stars.push(
            <span key={i} className={`ri-star${i<=rating?'-fill':'-line'} ${i<=rating?'text-yellow-400':'text-yellow-400'}`}></span>
        )
    }
  return (
    <div className=' mb-0'>
        {stars}
      
    </div>
  )
}

export default RatingStar
