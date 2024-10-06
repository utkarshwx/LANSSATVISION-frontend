import React, { useState } from 'react'
import { Bell } from 'lucide-react'

export default function NotificationSettings() {
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState({ lat: '', lng: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const response = await fetch('/api/notifications/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
        }),
      })

      if (response.ok) {
        setSubmitMessage('Notification scheduled successfully!')
        setEmail('')
        setLocation({ lat: '', lng: '' })
      } else {
        setSubmitMessage('Failed to schedule notification. Please try again.')
      }
    } catch (error) {
      console.error('Error scheduling notification:', error)
      setSubmitMessage('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">Notification Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="lat"
            label="Latitude"
            type="number"
            value={location.lat}
            onChange={(e) => setLocation(prev => ({ ...prev, lat: e.target.value }))}
          />
          <InputField
            id="lng"
            label="Longitude"
            type="number"
            value={location.lng}
            onChange={(e) => setLocation(prev => ({ ...prev, lng: e.target.value }))}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Scheduling...' : 'Schedule Notifications'}
        </Button>
      </form>
      {submitMessage && (
        <div className={`p-4 rounded-md ${submitMessage.includes('successfully') ? 'bg-green-800' : 'bg-red-800'}`}>
          <p className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            {submitMessage}
          </p>
        </div>
      )}
    </div>
  )
}

function InputField({ id, label, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
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