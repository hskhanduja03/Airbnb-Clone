import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='flex flex-col min-h-screen p-5'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout