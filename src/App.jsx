import {useState } from "react"
import axios from 'axios';



const App = () => {
  const [location,setLocation]=useState('')
  const [data,setData]=useState({})
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${import.meta.env.VITE_API_KEY}`
  
    const searchLocation = (e) => {
      if(e.key === 'Enter') {
        axios.get(URL).then((response) => {
          setData(response.data)
          console.log(response.data)
        })
        setLocation('')
      }
    }
 

  return (
    <>
      <div className="app">
        <div className="search">
          <input type="text"
           onKeyDown={searchLocation} 
           value={location} 
           onChange={(event) => setLocation(event.target.value)}
           placeholder="Enter Location"/>
        </div>

        <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
           {data.main ?<h1>{data.main.temp.toFixed()}°F</h1>:null}
          </div>
          <div className="description">
            {data.main ?<p className="bold">{data.weather[0].main}</p>:null}
          </div>      
        </div>
       {
        data.name !== undefined && 
        <div className="bottom">
          <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p>:null}
            <p>Feels like</p>
          </div>
          <div className="humidty">
          {data.main ? <p className="bold">{data.main.humidity}%</p>:null}
           <p>Humidity</p>
          </div>
          <div className="wind">
            {data.main ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
            <p>Wind speed </p>
          </div>
          </div>
       }
        </div>
      </div>
    </>
  );
}

export default App