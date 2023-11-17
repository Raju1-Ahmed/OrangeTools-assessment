import axios from "axios"

const apiKey = "a26f4a94770d34b79335892de933b574";

const getWeather = async (city, tempMode) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempMode === "F" ? "imperial" : "metric"}&appid=${apiKey}`;

    try {
        const res = await axios.get(url)
        return res.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 'Location not found. Please enter a valid location';
        } else {
            return 'Something went wrong. Please try again';
        }
    }
}

export default getWeather;