import React, { useState, useEffect } from 'react'
import axios from 'axios'

const OtpDisplay = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '20px',
    },
    input: {
      width: '300px',
      height: '35px',
      marginBottom: '10px',
      fontSize: '16px',
      padding: '5px 10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      outline: 'none',
    },
    button: {
      width: '150px',
      height: '35px',
      fontSize: '16px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    otp: {
      fontSize: '20px',
      margin: '10px 0',
    },
    timer: {
      fontSize: '18px',
      color: '#fff',
    }
  }

  const [secretKey, setSecretKey] = useState('')
  const [otp, setOtp] = useState('')
  const [remainingTime, setRemainingTime] = useState(0)

  const fetchOtp = async () => {
    try {
      // Replace with the correct URL to your FastAPI backend
      const response = await axios.post('http://142.171.175.29:8000/generate-otp', { secret_key: secretKey })
      setOtp(response.data.otp)
      setRemainingTime(response.data.remaining_time)
    } catch (error) {
      console.error('Error fetching the OTP:', error)
    }
  }

  useEffect(() => {
    let intervalId

    // Update the OTP only if remainingTime is set
    if (remainingTime > 0) {
      intervalId = setInterval(() => {
        setRemainingTime((time) => time - 1)
      }, 1000)
    }

    // Clear the interval on unmount
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [remainingTime])

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        placeholder="Enter your secret key"
        style={styles.input}
      />
      <button onClick={fetchOtp} style={styles.button}>Get OTP</button>
      {otp && <h1 style={styles.otp}>OTP: {otp}</h1>}
      {remainingTime > 0 && <h2 style={styles.timer}>Time Remaining: {remainingTime} seconds</h2>}
    </div>
  )
}

export default OtpDisplay


