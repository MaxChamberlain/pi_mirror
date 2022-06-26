import './App.css';
import { useState, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
const axios = require('axios')
const logo = require('./Images/logo.png')

function App() {
  const [ now, setNow ] = useState(new Date())
  const [ weather, setWeather ] = useState(null)
  const [ dow, setDow ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [ wotd, setWotd ] = useState(null)

  useEffect(() => {
    const startProcess = () => {
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
        }
        )
      }, 1000)
      setInterval(() => {
        getWeather()
      }, 60000)
      setInterval(() => {
        getWotd()
      }, 6000000)
    }

    const init = async () => {
      setLoading(true)
      await getWeather()
      await getWotd()
      setLoading(false)
      startProcess()
    }
    init()
  }, [])
  return (
    <div className="App">
      <header className="App-header" style={{ background: 'black', fontSize: 50 }}>
        <TransitionGroup component='div'>
          {loading && 
            <CSSTransition timeout={500} classNames='logo'>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'black',
                  zIndex: 9999,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img 
                  className='logo'
                  src={logo} 
                  style={{
                    filter: 'invert()',
                    height: '50%',
                    animation: 'logo-animation 4s infinite'
                  }}
                />
              </div>
            </CSSTransition>
          }
        </TransitionGroup>
        {weather && <div style={{ marginTop: -300 }}>
          <img src={weather.current.condition.icon} style={{
            height: 100,
          }}/>
          <div style={{marginLeft: 10, fontSize: 30, marginTop: -20}}>
            {weather.current.condition.text}
          </div>
          <span style={{marginLeft: 10}}>
            {weather.current.feelslike_f}°
          </span>
          <div style={{ fontSize: 30 }}>
            {weather.current.wind_mph} mph wind
          </div>
        </div>}
        {wotd && <div style={{ padding: 20, position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', width: 500, border: '1px solid white', borderRadius: 10}}>
          <div>
            Fun {wotd.type.slice(0,1).toUpperCase()}{wotd.type.slice(1).toLowerCase()} Fact!
          </div>
          <div style={{ fontWeight: 'bold', fontSize: 40, marginTop: 10 }}>
            {wotd.number}
          </div>
          <span style={{fontSize: 30}}>
            {wotd.text}
          </span>
        </div>}
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
          <div>
            <span>Good {now.getHours() >= 18 ? 'Evening' : now.getHours() > 12 ? 'Afternoon' : 'Morning'} Max</span>
          </div>
          <div>
            <span>{dow}</span>
            <br />
            <br />
            <span>{now.toLocaleDateString('en-US')}</span>
            <br />
            <span>{now.toLocaleTimeString('en-US')}</span>
          </div>
        </div>
      </header>
    </div>
  );

  async function getWeather(){
    const {data} = await axios.get(
      'https://stark-oasis-84035.herokuapp.com/http://api.weatherapi.com/v1/current.json?key=6e26edac348843e4b8e10413222506&q=80108&aqi=no'
    )
    setWeather(() => data)
  }
  
  async function getWotd(){
    const options = {
      method: 'GET',
      url: 'https://numbersapi.p.rapidapi.com/42/trivia',
      params: {fragment: 'true', notfound: 'floor', json: 'true'},
      headers: {
        'X-RapidAPI-Key': '201dffeb44msha4935f324c57c78p1546f3jsn6d578064153b',
        'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
      }
    }
    
    const {data} = await axios.request(options)
    setWotd(data)
  }
}

export default App;