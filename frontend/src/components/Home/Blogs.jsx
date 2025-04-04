import React from 'react'
import blogsData from '../../data/blogs.json'
const Blogs = () => {
  return (
    <div className='section__container blog__container overflow-x-hidden'>
        <h2 className='section__header'>Latest From Blog</h2>
        <p className='section__subheader'>Elevate your wardrobe with our fresh style tips, tends and inspiration on our blog.</p>
        <div className='grid grid-cols-1 mt-10 sm:grid-cols-2 p-8  lg:grid-cols-4 gap-8'>
            {
                blogsData.map((blog,index)=>{
                    return <div key={index} className='blog__card cursor-pointer hover:scale-110 transition-all duration-200'>
                            <img src={blog.imageUrl} alt={blog.subtitle} />
                            <div className='blog__card__content'>
                                <h6>{blog.subtitle}</h6>
                                <h4>{blog.title}</h4>
                                <p>{blog.date}</p>
                            </div>
                            
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Blogs
