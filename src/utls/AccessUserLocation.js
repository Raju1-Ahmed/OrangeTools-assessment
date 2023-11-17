import { useEffect, useState } from 'react';

const AccessUserLocation = () => {
    const [cityName, setCityName] = useState('');
    useEffect(() => {
        const fetchLocation = async () => {
            if (navigator.geolocation) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });

                    const { latitude, longitude } = position?.coords;
                    const apiKey = 'dba3ef06cde442d0b63069cd02230f13';

                    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
                    const data = await response.json();
                    const cityName = data?.results[0]?.components?.state;
                    setCityName(cityName);
                } catch (error) {
                    console.error(`Error getting location: ${error.message}`);
                }
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        fetchLocation();
    }, []);
    return cityName;
};

export default AccessUserLocation;