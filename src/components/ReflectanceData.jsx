import React, { useState } from 'react'
import { BarChart2 } from 'lucide-react'

export default function ReflectanceData() {
  const [location, setLocation] = useState({ lat: '', lng: '' })
  const [reflectanceData, setReflectanceData] = useState(null)
  const [loading, setLoading] = useState(false)
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
      <h2 className="text-3xl font-bold mb-4 text-blue-400">Request Data</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="lat"
            label="Latitude"
            value={location.lat}
            onChange={(e) => {
              setLoad(false);
              setLocation(prev => ({ ...prev, lat: e.target.value }))}}
          />
          <InputField
            id="lng"
            label="Longitude"
            value={location.lng}
            onChange={(e) => {
              setLoad(false);
              setLocation(prev => ({ ...prev, lng: e.target.value }))}}
          />
        </div>
        <Button type="submit">
          Fetch Data
        </Button>
      </form>
      { load && (
        <div>
          {message2 && (            
            <p className="text-red-500 text-center text-3xl">{message2}</p>
          )}          {
            message1 && (
              <div>
                <p className="text-red-500 text-center text-3xl m-6">{message1}</p>
                <p className='text-white'>Pixel value for Coastal/Aerosol: <b>8811</b></p>
                <p className='text-white'>Pixel value for Surface Temperature: <b>168</b></p>
                <p className='text-white'>Pixel value for Surface Blue band: <b>9095</b></p>
                <p className='text-white'>Pixel value for Surface Red band: <b>10447</b></p>
                <p className='text-white'>Pixel value for Surface Green band: <b>9876</b></p>
                <p className='text-white'>Pixel value for SWIR1: <b>12729</b></p>
                <p className='text-white'>Pixel value for SWIR2: <b>11826</b></p>
              </div>              
            )
          }
        </div>        
      )

      }
      {reflectanceData && (
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg overflow-x-auto">
          <div className="flex items-center space-x-4 mb-4">
            <BarChart2 className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-semibold text-blue-400">Reflectance Data</h3>
          </div>
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Band</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {Object.entries(reflectanceData).map(([band, value]) => (
                <tr key={band}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{band}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
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