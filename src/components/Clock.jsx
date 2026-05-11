import { useEffect, useState } from 'react'

function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      const now = new Date()
      const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Africa/Casablanca',
        timeZoneName: 'short',
      }).format(now)

      setTime(`Tangier ${formattedTime}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div className="clock">{time}</div>
}

export default Clock
