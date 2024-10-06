import React, { useState } from 'react'
import { Satellite } from 'lucide-react'
import { Link } from 'react-router-dom';

export default function OverpassInfo() {
  const [location, setLocation] = useState({ lat: '', lng: '' })
  const [overpassData, setOverpassData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if((location.lat>90 && location.lat<-90) || (location.lng>180 && location.lng<-180)){ 
      alert("Latitude must be between -90 and 90 and Longitude must be between -180 and 180");

    }
    if ((location.lng <=-116.081732 && location.lng >= -113.497216) || (location.lat >= 35.009529 && location.lat <= 37.049591)) {
      setMessage2('');
      setLoad(true);
      setMessage1('Reflectance Data');
      
    }
    else {
      setMessage1('');
      setLoad(true);
      setMessage2('Sorry I don\'t have access the data of those coordinates due to limits of storage. \n Please try between longitude -116.081732 and -113.497216, latitude and 35.009529 and 37.049591'); 
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">Upcoming Overpass Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="lat"
            label="Latitude"
            value={location.lat}
            onChange={(e) => {
              setLoad(false)
              setLocation(prev => ({ ...prev, lat: e.target.value }))}}
          />
          <InputField
            id="lng"
            label="Longitude"
            value={location.lng}
            onChange={(e) => {
              setLoad(false)
              setLocation(prev => ({ ...prev, lng: e.target.value }))}}
          />
        </div>
        <Button type="submit">
          Fetching
        </Button>
      </form>
      {load && (
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <div className="flex items-center space-x-4 mb-4">
            <Satellite className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-semibold text-blue-400">Next Overpass</h3>
          </div>
          <div>
          {message2 && (            
            <p className="text-red-500 text-center text-2xl">{message2}</p>
          )}          {
            message1 && (
              <div>
                <p className='text-white text-xl'>Next Overpass: <b>10th October, 2024</b></p>
                <p className="text-white text-xl">You can set notification through <Link to="/notifications" className='hover:text-blue-400 hover:font-semibold'>Notification</Link></p>
              </div>
              
            )
          }
        </div> 

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

function Button({ children, ...props }) {
  return (
    <button
      className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  )
}