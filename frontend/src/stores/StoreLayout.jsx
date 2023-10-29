import React from 'react'
import Header from './header'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const StoreLayout = () => {
  return (
    <div>
        <Header/>
        <main>
        <Outlet/>
        </main>
        <Footer/>
      
    </div>
  )
}

export default StoreLayout
