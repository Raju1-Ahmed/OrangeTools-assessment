const convertDate = ({data}) => {
    console.log(data)
    const { dt, timezone } = data;
    // Convert timestamp to a Date object
    const date = new Date(dt * 1000);

    // Adjusting for the timezone offset
    const localTime = new Date(date.getTime() + timezone * 1000);

    // Getting the day of the week and time
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(localTime);
    const timeOfDay = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log(dayOfWeek, timeOfDay);

}

export default convertDate;