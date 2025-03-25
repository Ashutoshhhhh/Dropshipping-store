import Hero from './Hero'
import Promo from './Promo'
import React from 'react'
import Banner from './Banner'
import Categories from './Categories'
import TrendingProducts from '../Shop/TrendingProducts'
import DealsSection from './DealsSection'
import Blogs from './Blogs'
import Footer from './Footer'
const Home = () => {
  return (
    <>
    <Banner/>
    <Categories/>
    <Hero/>
    <TrendingProducts/>
    <DealsSection/>
    <Promo/>
    <Blogs/>
    
    </>
  )
}

export default Home
