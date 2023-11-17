import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BarChartDisplay = ({ dailyWeather, tempMode }) => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            // Customize the tooltip content here based on your requirements
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label}`}</p>
                    <p style={{ color: "#8884d8" }}>{`High: ${payload && payload[0]?.value}°${tempMode}`}</p>
                    <p style={{ color: "#f0d07c" }}>{`Low: ${payload && payload[1]?.value}°${tempMode}`}</p>
                </div>
            );
        }

        return null;
    };
    // resize event on window
    const handleResize = () => {
        setWindowSize({
            width: window.innerWidth,
        });
    };

    useEffect(() => {
        // Add event listener when component mounts
        window.addEventListener('resize', handleResize);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <ResponsiveContainer width="100%" height={windowSize?.width > 480 ? 400 : 250}>
            <BarChart data={dailyWeather}>
                <CartesianGrid strokeDasharray="1 2" />
                <XAxis dataKey="weekDayName" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip content={<CustomTooltip />} wrapperStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: "none",
                    padding: '10px 15px',
                    borderRadius: '4px',
                    color: '#000'
                }} />
                <Legend wrapperStyle={{ color: '#888' }} />
                <Bar dataKey="High" stackId="a" fill="#8884d8" />
                <Bar dataKey="Low" fill="#f0d07c" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartDisplay;