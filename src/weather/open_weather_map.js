const WEATHER_API_KEY = '';
const API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';

function zipUrl(zip, city) {
    return `${API_STEM}zip=${zip},${city}&appid=${WEATHER_API_KEY}`;
}

function fetchForecast(zip, city) {
    return fetch(zipUrl(zip, city))
        .then( (responseJSON) => {
            let body = JSON.parse(responseJSON._bodyInit);
            return {
                main: body.weather[0].main,
                description: body.weather[0].description,
                temp: body.main.temp
            };
        })
        .catch(error => {
            console.log('FAILED')
            console.log(error);
        });
}

export default { fetchForecast: fetchForecast };