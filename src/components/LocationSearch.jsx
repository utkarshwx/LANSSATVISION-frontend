import React, { useState } from 'react'
import { FaSearch, FaLocationArrow } from 'react-icons/fa'

export default function LocationSearch() {
  const [location, setLocation] = useState({ lat: '', lng: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically do something with the location data
    console.log('Location submitted:', location)
  }

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({
            lat: latitude.toFixed(6),
            lng: longitude.toFixed(6)
          })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">Location Search</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="lat"
            label="Latitude"
            value={location.lat}
            onChange={(e) => setLocation(prev => ({ ...prev, lat: e.target.value }))}
          />
          <InputField
            id="lng"
            label="Longitude"
            value={location.lng}
            onChange={(e) => setLocation(prev => ({ ...prev, lng: e.target.value }))}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit">
            <FaSearch className="w-5 h-5 mr-2" />
            Set Location
          </Button>
          <Button type="button" onClick={handleGetCurrentLocation} secondary>
            <FaLocationArrow className="w-5 h-5 mr-2" />
            Get Current Location
          </Button>
        </div>
      </form>
      {location.lat && location.lng && (
        <div className="mt-4 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">Selected Location</h3>
          <p className="text-lg text-gray-300">
            Latitude: {location.lat}, Longitude: {location.lng}
          </p>
        </div>
      )}
    </div>
  )
}

function InputField({ id, label, value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={onChange}
        step="any"
        required
        className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

function Button({ children, secondary, ...props }) {
  const baseClasses = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400 flex items-center justify-center"
  const primaryClasses = "bg-blue-600 text-white hover:bg-blue-700"
  const secondaryClasses = "bg-gray-600 text-white hover:bg-gray-700"
  
  return (
    <button
      className={`${baseClasses} ${secondary ? secondaryClasses : primaryClasses}`}
      {...props}
    >
      {children}
    </button>
  )
}