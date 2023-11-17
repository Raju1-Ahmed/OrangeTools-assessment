import React, { useEffect, useState } from 'react';
import './css/Dashboard.css';
import BarChartDisplay from './components/BarChartDisplay';
import AccessUserLocation from './utls/AccessUserLocation';
import getWeather from './utls/GetWeather';
import getForecast from './utls/GetForecast';

const Dashboard = () => {
    const [data, setData] = useState({})
    const [err, setErr] = useState(null)
    const [dailyWeather, setDailyWeather] = useState([]);
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState('')
    const [tempMode, setTempMode] = useState('F')

    const city = data?.name || location;

    // function to fetch data from api
    const searchLocation = (event) => {
        // check if location is empty
        if (location === '') {
            setErr('Please enter a location.');
            setData({});
            setLoading(false);
            return;
        }
        const getData = async () => {
            setLoading(true);
            const data = await getWeather(city, tempMode);
            if (typeof data === 'object') {
                setErr(null);
                setData(data);
                setLoading(false);
                setLocation('');
            }
            else {
                setErr(data);
                setData({});
                setLoading(false);
            }
            return;
        }
        // if enter key is pressed
        if (event.key === 'Enter') {
            getData()
        }
        // if search button is clicked
        else if (event.type === 'click') {
            getData()
        }
    }
    // 5 days forecast function to fetch data from api

    useEffect(() => {
        const getForecastData = async () => {
            const res = await getForecast({ data, tempMode })
            if (res) {
                setDailyWeather(res)
            }
        }
        getForecastData()
    }, [data, tempMode]);
    useEffect(() => {
        if (city === '') return;
        const getData = async () => {
            const data = await getWeather(city, tempMode);
            if (typeof data === 'object') {
                setErr(null);
                setData(data);
            }
            else {
                setErr(data);
                setData({});
            }
            return;
        }
        getData()
    }, [tempMode]);
    // access user location
    const userLocation = AccessUserLocation();
    // get weather data for user location
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await getWeather(userLocation, tempMode);
            if (typeof data === 'object') {
                setErr(null);
                setData(data);
                setLoading(false);
            }
            else {
                setErr(data);
                setData({});
            }
            return;
        }
        if (userLocation !== '') {
            getData()
        }
    }, [userLocation]);
    return (
        <div className="app">
            <div className='container'>
                {/* Search and menu */}
                <nav className='nav'>
                    <div className='search-box'>
                        <input
                            value={location}
                            onChange={event => setLocation(event.target.value)}
                            onKeyDown={searchLocation}
                            placeholder='Enter Location' type='search' />
                        <button className='search-btn' onClick={searchLocation}>Search</button>
                    </div>
                </nav>
                {/* weather display section */}
                <div className='weather-container'>

                    {data?.name !== undefined &&
                        <>
                            <div>
                                <h1 className='location-name'>{data?.name}</h1>
                            </div>
                            <div className='temperature-box'>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={60} height={60} xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 96" enableBackground="new 0 0 96 96" space="preserve" fill="#f0d07c" stroke="#f0d07c"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Base" display="none"> </g> <g id="Dibujo"> <g> <path d="M21.001,53c1.104,0,2-0.896,2-2c0-3.859,3.141-7,7-7c0.277,0,0.723,0.068,1.193,0.162V46c0,1.104,0.896,2,2,2s2-0.896,2-2 v-3.219C36.267,36.528,41.63,32,48.001,32c6.37,0,11.733,4.528,12.807,10.782V46c0,1.104,0.896,2,2,2s2-0.896,2-2v-1.838 C65.278,44.068,65.724,44,66.001,44c3.859,0,7,3.141,7,7c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2 c0-4.938-3.272-9.125-7.76-10.512c2.933-2.603,4.76-6.395,4.76-10.488c0-1.104-0.896-2-2-2c-5.514,0-10-4.486-10-10 c0-1.104-0.896-2-2-2c-7.078,0-12.931,5.284-13.857,12.111C39.296,28.849,33.61,33.6,31.689,40.184 C31.113,40.079,30.508,40,30.001,40c-6.065,0-11,4.935-11,11C19.001,52.104,19.896,53,21.001,53z M58.169,20.168 c0.934,5.985,5.675,10.728,11.66,11.664c-0.615,3.246-2.84,6.006-5.862,7.326C61.812,33.21,56.52,28.952,50.175,28.15 C50.934,24.111,54.127,20.92,58.169,20.168z"></path> <path d="M40.001,59c0,1.104,0.895,2,2,2h36c1.104,0,2-0.896,2-2s-0.896-2-2-2h-36C40.896,57,40.001,57.896,40.001,59z"></path> <path d="M48.001,64c-1.105,0-2,0.896-2,2s0.895,2,2,2h27c1.104,0,2-0.896,2-2s-0.896-2-2-2H48.001z"></path> <path d="M78.001,71h-24c-1.105,0-2,0.896-2,2s0.895,2,2,2h24c1.104,0,2-0.896,2-2S79.105,71,78.001,71z"></path> <path d="M18.001,61h18c1.104,0,2-0.896,2-2s-0.896-2-2-2h-18c-1.105,0-2,0.896-2,2S16.896,61,18.001,61z"></path> <path d="M21.001,64c-1.105,0-2,0.896-2,2s0.895,2,2,2h21c1.104,0,2-0.896,2-2s-0.896-2-2-2H21.001z"></path> <path d="M48.001,71h-30c-1.105,0-2,0.896-2,2s0.895,2,2,2h30c1.104,0,2-0.896,2-2S49.105,71,48.001,71z"></path> </g> </g> </g></svg>
                                {data?.main ? <h1>{data?.main?.temp?.toFixed()} °{tempMode}</h1> : null}
                                {data?.weather ? <p>{data?.weather[0]?.main}</p> : null}
                            </div>
                            <div className="extra-temp-data">
                                <div className="feels">
                                    {data.main ? <p className='bold'>{data?.main?.feels_like?.toFixed()}°{tempMode}</p> : null}
                                    <p>Feels Like</p>
                                </div>
                                <div className="humidity">
                                    {data.main ? <p className='bold'>{data?.main?.humidity}%</p> : null}
                                    <p>Humidity</p>
                                </div>
                                <div className="wind">
                                    {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </>
                    }

                    {/* error display here */}
                    {
                        err && !loading && <div className='error'>
                            <p><i>{err}!</i></p>
                        </div>
                    }

                    {/* loading display here */}
                    {loading && <div className='loading'>
                        <img src='/images/loader.gif' alt='loadergif'></img>
                    </div>}
                </div>
                {/* bar chart here */}
                {data.name !== undefined && <>
                    <div className='setting-tab'>
                        <p>5 Days Forecast : </p>
                        <div>
                            View in : <button className={`temp-btn`} style={{ color: `${tempMode === "C" ? "#f0d07c" : "#fff"}` }} onClick={() => setTempMode("C")}>°C</button> / <button className='temp-btn' onClick={() => setTempMode("F")} style={{ color: `${tempMode === "F" ? "#f0d07c" : "#fff"}` }}>°F</button>
                        </div>
                    </div>
                    <div className='bar-chart-container'>
                        <BarChartDisplay dailyWeather={dailyWeather} tempMode={tempMode} />
                    </div></>}

            </div>
        </div>
    );
};

export default Dashboard;