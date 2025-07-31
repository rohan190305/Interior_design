import Gallery from '@/component/gallery/Gallery'
import Footer from '@/component/home/Footer'
import Navbar from '@/component/home/Navbar'
import React from 'react'

const Page = () => {
  return (
    <div>
        <Navbar/>
      <Gallery/>
      <Footer/>
    </div>
  )
}

export default Page
