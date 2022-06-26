import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react'
const axios = require('axios')

function App() {
  const [ now, setNow ] = useState(new Date())
  const [ weather, setWeather ] = useState(null)
  const [ dow, setDow ] = useState(null)

  useEffect(() => {
    setInterval(() => {
      setNow(new Date())
      setDow(() => {
        switch(now.getDay()){
          case 0:
            return 'Sunday'
          case 1:
            return 'Monday'
          case 2:
            return 'Tuesday'
          case 3:
            return 'Wednesday'
          case 4:
            return 'Thursday'
          case 5:
            return 'Friday'
          case 6:
            return 'Saturday'
          default:
            return 'Monday'
        }
      })
    }, 1000)
    getWeather()
  }, [])
  return (
    <div className="App">
      <header className="App-header" style={{ background: 'black', fontSize: 50 }}>
        <div
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
        {weather && <div>
          <img src={weather.current.condition.icon} />
          <div style={{marginLeft: 10, fontSize: 30}}>
            {weather.current.condition.text}
          </div>
          <span style={{marginLeft: 10}}>
            {weather.current.feelslike_f}°
          </span>
          <div style={{ fontSize: 30 }}>
            {weather.current.wind_mph} mph wind
          </div>
        </div>}
          <div>
            <span>Good {now.getHours() >= 18 ? 'Evening' : now.getHours() > 12 ? 'Afternoon' : 'Morning'} Max</span>
          </div>
          <div>
            <span>{dow}</span>
            <br />
            <br />
            <span>{now.toLocaleDateString()}</span>
            <br />
            <span>{now.toLocaleTimeString()}</span>
          </div>
        </div>
      </header>
    </div>
  );

  async function getWeather(){
    const {data} = await axios.get(
      'http://api.weatherapi.com/v1/current.json?key=6e26edac348843e4b8e10413222506&q=80108&aqi=no'
    )
    setWeather(data)
  }
}

export default App;