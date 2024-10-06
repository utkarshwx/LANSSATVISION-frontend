import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { FaSatellite, FaSearch, FaChartBar, FaBell } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'
import AnimatedSatellite from './animated-satellite';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 bg-opacity-80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-400">
              <FaSatellite className="w-8 h-8" />
              <span>LandsatVision</span>
            </Link>
            <div className="hidden md:flex space-x-4">
              <NavLinks />
            </div>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              <NavLinks mobile setIsMenuOpen={setIsMenuOpen} />
            </div>
          )}
        </nav>
      </header>

      <main className="container mx-auto p-4 flex-grow">
        <div className='w-full flex justify-center items-center'>
          <div className='w-1/2 m-4'>

            <Outlet />
          </div>

          <div className='w-1/2 m-4'>

            <AnimatedSatellite />
            <p className='text-3xl mt-10 text-center'>TEAM NAME: SATEYE EXPLORER</p>
            <p className='text-3xl mt-10 text-center'>TEAM MEMBERS: AMAN & UTKARSH</p>
          </div>
        </div>

         
        <div className='w-1/2 flex justify-center items-center'>
          
        </div>
      </main>

      <footer className="bg-gray-800 bg-opacity-80 backdrop-blur-sm py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          2024 LandsatVision. All rights reserved by Aman and Utkarsh.
        </div>
      </footer>
    </div>
  )
}

function NavLinks({ mobile, setIsMenuOpen }) {
  const links = [
    { to: "/", text: "Home", icon: FaSatellite },
    { to: "/search", text: "Location Search", icon: FaSearch },
    { to: "/overpass", text: "Overpass Info", icon: FaSatellite },
    { to: "/reflectance", text: "Reflectance Data", icon: FaChartBar },
    { to: "/notifications", text: "Notifications", icon: FaBell },
  ]

  return (
    <>
    {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `${
              isActive ? 'text-blue-400' : 'text-white'
            } hover:text-blue-300 transition-colors ${
              mobile ? 'block py-2' : ''
            } flex items-center space-x-2`
          }
          onClick={() => mobile && setIsMenuOpen(false)}
        >
          <link.icon className="w-5 h-5" />
          <span>{link.text}</span>
        </NavLink>
      ))}
    
     
    </>
  )
}