import CTA from '@/component/home/CTA'
import Footer from '@/component/home/Footer'
import Hero from '@/component/home/Hero'
import Navbar from '@/component/home/Navbar'
import Services from '@/component/home/Services'
import Showcase from '@/component/home/Showcase'
import Vision from '@/component/home/Vision'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Services/>
      <Showcase/>
      <Vision/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default Page
