import React from 'react'
import TopNav from '../components/public/TopNav'
import Hero from '../components/public/Hero'
import Services from '../components/public/Services'
import About from '../components/public/About'
import Reviews from '../components/public/Reviews'
import Faqs from '../components/public/Faqs'
import Contact from '../components/public/Contact'
import Footer from '../components/public/Footer'

function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <About />
      <Services />
      <Reviews />
      <Faqs />
      <Contact />
      <Footer />
    </>
  )
}

export default Home
