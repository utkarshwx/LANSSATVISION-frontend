import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import LocationSearch from './components/LocationSearch'
import OverpassInfo from './components/OverpassInfo'
import ReflectanceData from './components/ReflectanceData'
import NotificationSettings from './components/NotificationSettings'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white bg-cover bg-fixed">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/search" element={<LocationSearch />} />
            <Route path="/overpass" element={<OverpassInfo />} />
            <Route path="/reflectance" element={<ReflectanceData />} />
            <Route path="/notifications" element={<NotificationSettings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}