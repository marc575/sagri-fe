import React from 'react'
import TopNav from '../components/public/TopNav'
import Hero from '../components/public/Hero'
import Services from '../components/public/Services'
import About from '../components/public/About'
import Reviews from '../components/public/Reviews'
import Faqs from '../components/public/Faqs'
import Contact from '../components/public/Contact'

function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Faqs />
      <Contact />
    </>
  )
}

export default Home
