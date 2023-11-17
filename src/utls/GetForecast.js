import axios from "axios";
import { DateTime } from "luxon";

const apiKey = "a26f4a94770d34b79335892de933b574";

const getForecast = async ({data, tempMode}) => {
    // 5 days forecast api url
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${data?.coord?.lat}&lon=${data?.coord?.lon}&appid=${apiKey}&units=${tempMode === "F" ? "imperial" : "metric"}`;

    if (!data?.coord?.lat || !data?.coord?.lon) return;
    try {
        const res = await axios.get(forecastUrl);
        // Group weather data by date
        const groupedData = res?.data?.list?.reduce((result, data) => {
            const date = DateTime.fromSeconds(data.dt).toISODate();
            if (!result[date]) {
                result[date] = [];
            }
            result[date].push(data);
            return result;
        }, {});

        // Extract and set low and high temperatures along with date and week name
        const dailyWeatherInfo = Object.keys(groupedData).slice(1, 6).map((date) => {
            const dailyData = groupedData[date];
            const Low = Math.min(...dailyData.map((data) => data.main.temp_min));
            const High = Math.max(...dailyData.map((data) => data.main.temp_max));
            const dateObj = DateTime.fromISO(date);
            const weekDayName = dateObj.toFormat("cccc");
            return {
                date: dateObj.toFormat("yyyy-MM-dd"),
                weekDayName,
                Low: Low.toFixed(),
                High: High.toFixed(),
            };
        });

        return dailyWeatherInfo;
    } catch (error) {
        console.log(error)
    }
}

export default getForecast;