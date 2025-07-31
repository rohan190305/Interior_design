import Contact from '@/component/contact/Contact'
import Footer from '@/component/home/Footer'
import Navbar from '@/component/home/Navbar'
import React from 'react'

const Page = () => {
  return (
    <div>
        <div className="text-black mb-16">
        <Navbar/>
        </div>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Page
