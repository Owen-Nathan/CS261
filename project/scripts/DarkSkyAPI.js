/*
* Written By Nathan Owen
* Used for interactions with the DarkSky Weather API
 */

var apiKey = '67e32fae860a84d534c4b2fa48bc5ffe';
function getForecast(coordinates) {
    const Http = new XMLHttpRequest();
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    console.log(coordinates);
    let url = `${proxy}https://api.darksky.net/forecast/${apiKey}/${coordinates.coords.latitude},${coordinates.coords.longitude}`;

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200) {
            weatherData = JSON.parse(Http.responseText);
            console.log(weatherData);
            getCurrentConditions();
            getHourlyForecast();
        }
    }
}
function getCurrentConditions() {
//This includes Temperature, Feels like (windchill), precipitation, wind speed and direction,humidity
    let current = weatherData.currently;
    let low = weatherData.daily.data[0].temperatureLow.toFixed(0);
    let high = weatherData.daily.data[0].temperatureHigh.toFixed(0);
    document.getElementById('currentTemp').innerHTML = `${current.temperature.toFixed(0)}&deg;F`;
   document.getElementById('currentFeelsLike').innerHTML = `${current.apparentTemperature.toFixed(0)}&deg;F`;
    document.getElementById('currentIcon').className = `wi wi-${getConditionIcon(current.icon)}`;
    document.getElementById('currentWindSpeed').innerHTML = `<i class="wi wi-wind towards-${current.windBearing}-deg"></i> ${current.windSpeed.toFixed(0)} MPH`;
    document.getElementById('currentLowHigh').innerHTML = `${low}&deg;F <i class="wi wi-direction-down"></i> ${high}&deg;F <i class="wi wi-direction-up"></i>`;
    document.getElementById('currentPrecip').innerText = `${current.precipProbability * 100}%`;
    document.getElementById('currentSummary').innerText = current.summary;
}

function calculateDirection(bearing){
    if(bearing > 330 && bearing <= 15)
        return 'N';
    else if(bearing > 15 && bearing <= 75)
        return 'NE';
    else if(bearing > 75 && bearing <= 115)
        return 'E';
    else if(bearing > 115 && bearing <= 150)
        return 'SE'
    else if(bearing > 150 && bearing <= 195)
        return 'S';
    else if(bearing > 195 && bearing <= 240)
        return 'SW';
    else if(bearing > 240 && bearing <= 290)
        return 'W';
    else if(bearing > 290 && bearing <= 330)
        return 'NW';
}

function getConditionIcon(icon) {
    switch(icon) {
        case 'clear-day': return 'day-sunny';
        case 'clear-night': return 'night-clear';
        case 'rain': return 'rain';
        case 'snow': return 'snow';
        case 'sleet': return 'sleet';
        case 'wind': return "strong-wind";
        case 'fog': return "fog";
        case 'cloudy': return "cloudy";
        case 'partly-cloudy-day': return "day-cloudy";
        case 'partly-cloudy-night': return "night-cloudy";
        case 'hail': return "hail";
        case 'thunderstorm': return "thunderstorm";
        case 'tornado': return "tornado";
    }
}


function getSevenDayForecast() {
    let daily = weatherData.daily;

    daily.data.forEach(function(day) {
        let low = day.temperatureLow.toFixed(0);
        let high = day.temperatureHigh.toFixed(0);
        let hourlyDivRow = document.getElementById("dailyForecasts");
        let hourRow = document.createElement("div");
        hourRow.className = "forecastItem flexItem";
        hourRow.innerHTML = `<span class="dayLabel blackBackground">${getDay(day.time)}</span>
                             <span class="dayTempLabel">${low}&deg;F <i class="wi wi-direction-down"></i> ${high}&deg;F <i class="wi wi-direction-up"></i></span>
                             <i class="hourlyIcon wi wi-${getConditionIcon(day.icon)}"></i>`;
        hourlyDivRow.appendChild(hourRow);
    });
}

/*
            <div class="conditionItem">
                <span class="hourLabel">7 PM</span>
                <span class="tempLabel">30&deg;F</span>
                <i class="hourlyIcon wi wi-rain"></i>
            </div>
            <span>Feels Like: ${hour.apparentTemperature}&deg;F</span>
                             <span>Wind: ${hour.windSpeed} ${calculateDirection(hour.windBearing)}</span>
                             <span>Precip: ${(hour.precipProbability * 100).toFixed(0)}%</span><br>
 */
function getHourlyForecast() {
    let hourly = weatherData.hourly;
    hourly.data.forEach(function(hour) {
       let hourlyDivRow = document.getElementById("hourlyConditions");
        let hourRow = document.createElement("div");
        hourRow.className = "conditionItem flexItem";
        hourRow.innerHTML = `<span class="hourLabel blackBackground">${getTime(hour.time)}</span>
                             <span class="tempLabel">${hour.temperature.toFixed(0)}&deg;F</span>
                             <i class="hourlyIcon wi wi-${getConditionIcon(hourly.icon)}"></i>
                             <span class="hourPrecip">${(hour.precipProbability * 100).toFixed(0)} <i class="wi wi-humidity"></i></span>
                             <span class="hourPrecip"><i class="wi wi-wind towards-${hour.windBearing}-deg"></i> ${hour.windSpeed.toFixed(0)}<br>mph</span>`;
        hourlyDivRow.appendChild(hourRow);
    });

}

function getTime(unixTimestamp) {
    let date = new Date(unixTimestamp * 1000);

    return date.toLocaleString('en-US', {hour: 'numeric', hour12: true});
}

function getDay(unixTimestamp) {
    let date = new Date(unixTimestamp * 1000);
    return date.toLocaleString('en-US', {weekday: 'short'});
}

function getCurrentLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getForecast);
    } else {
        return {latitude: 0, longitude: 0};
    }
}

var weatherData =
    {
        "latitude": 35.3067176,
        "longitude": -97.4868389,
        "timezone": "America/Chicago",
        "currently": {
            "time": 1544589815,
            "summary": "Partly Cloudy",
            "icon": "partly-cloudy-night",
            "nearestStormDistance": 550,
            "nearestStormBearing": 2,
            "precipIntensity": 0,
            "precipProbability": 0,
            "temperature": 48.87,
            "apparentTemperature": 44.87,
            "dewPoint": 37.37,
            "humidity": 0.64,
            "pressure": 1016.9,
            "windSpeed": 9.35,
            "windGust": 12.19,
            "windBearing": 209,
            "cloudCover": 0.37,
            "uvIndex": 0,
            "visibility": 10,
            "ozone": 278.12
        },
        "minutely": {
            "summary": "Partly cloudy for the hour.",
            "icon": "partly-cloudy-night",
            "data": [
                {
                    "time": 1544589780,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544589840,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544589900,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544589960,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590020,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590080,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590140,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590200,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590260,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590320,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590380,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590440,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590500,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590560,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590620,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590680,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590740,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590800,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590860,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590920,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544590980,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591040,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591100,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591160,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591220,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591280,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591340,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591400,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591460,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591520,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591580,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591640,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591700,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591760,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591820,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591880,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544591940,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592000,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592060,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592120,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592180,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592240,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592300,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592360,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592420,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592480,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592540,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592600,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592660,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592720,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592780,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592840,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592900,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544592960,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593020,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593080,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593140,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593200,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593260,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593320,
                    "precipIntensity": 0,
                    "precipProbability": 0
                },
                {
                    "time": 1544593380,
                    "precipIntensity": 0,
                    "precipProbability": 0
                }
            ]
        },
        "hourly": {
            "summary": "Partly cloudy starting later tonight.",
            "icon": "partly-cloudy-day",
            "data": [
                {
                    "time": 1544587200,
                    "summary": "Clear",
                    "icon": "clear-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 50.43,
                    "apparentTemperature": 50.43,
                    "dewPoint": 36.39,
                    "humidity": 0.58,
                    "pressure": 1017.26,
                    "windSpeed": 10,
                    "windGust": 10.03,
                    "windBearing": 207,
                    "cloudCover": 0.16,
                    "uvIndex": 0,
                    "visibility": 9.74,
                    "ozone": 276.59
                },
                {
                    "time": 1544590800,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 48.28,
                    "apparentTemperature": 44.23,
                    "dewPoint": 37.68,
                    "humidity": 0.67,
                    "pressure": 1016.77,
                    "windSpeed": 9.1,
                    "windGust": 13,
                    "windBearing": 210,
                    "cloudCover": 0.45,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 278.7
                },
                {
                    "time": 1544594400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0013,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 47.08,
                    "apparentTemperature": 42.78,
                    "dewPoint": 38.62,
                    "humidity": 0.72,
                    "pressure": 1016.51,
                    "windSpeed": 9.03,
                    "windGust": 18.13,
                    "windBearing": 208,
                    "cloudCover": 0.71,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 280.88
                },
                {
                    "time": 1544598000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 45.47,
                    "apparentTemperature": 41.41,
                    "dewPoint": 38.98,
                    "humidity": 0.78,
                    "pressure": 1016.48,
                    "windSpeed": 7.66,
                    "windGust": 17.1,
                    "windBearing": 197,
                    "cloudCover": 0.66,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 282.61
                },
                {
                    "time": 1544601600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 44.33,
                    "apparentTemperature": 40.81,
                    "dewPoint": 38.94,
                    "humidity": 0.81,
                    "pressure": 1016.88,
                    "windSpeed": 6.18,
                    "windGust": 12.95,
                    "windBearing": 217,
                    "cloudCover": 0.83,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 284.4
                },
                {
                    "time": 1544605200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0002,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 43.08,
                    "apparentTemperature": 39.91,
                    "dewPoint": 38.7,
                    "humidity": 0.84,
                    "pressure": 1016.89,
                    "windSpeed": 5.26,
                    "windGust": 10.08,
                    "windBearing": 219,
                    "cloudCover": 0.61,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 286.34
                },
                {
                    "time": 1544608800,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 41.45,
                    "apparentTemperature": 38.46,
                    "dewPoint": 37.86,
                    "humidity": 0.87,
                    "pressure": 1016.69,
                    "windSpeed": 4.62,
                    "windGust": 8.2,
                    "windBearing": 215,
                    "cloudCover": 0.43,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 288.71
                },
                {
                    "time": 1544612400,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 39.57,
                    "apparentTemperature": 37.25,
                    "dewPoint": 36.54,
                    "humidity": 0.89,
                    "pressure": 1016.36,
                    "windSpeed": 3.57,
                    "windGust": 6,
                    "windBearing": 225,
                    "cloudCover": 0.37,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 291.25
                },
                {
                    "time": 1544616000,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0014,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 38.07,
                    "apparentTemperature": 36.17,
                    "dewPoint": 35.58,
                    "humidity": 0.91,
                    "pressure": 1016.19,
                    "windSpeed": 3.01,
                    "windGust": 4.82,
                    "windBearing": 225,
                    "cloudCover": 0.4,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 293.5
                },
                {
                    "time": 1544619600,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0002,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 37.17,
                    "apparentTemperature": 37.17,
                    "dewPoint": 35,
                    "humidity": 0.92,
                    "pressure": 1016.3,
                    "windSpeed": 2.3,
                    "windGust": 3.34,
                    "windBearing": 272,
                    "cloudCover": 0.35,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 295.08
                },
                {
                    "time": 1544623200,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 36.88,
                    "apparentTemperature": 36.88,
                    "dewPoint": 34.94,
                    "humidity": 0.93,
                    "pressure": 1016.34,
                    "windSpeed": 1.89,
                    "windGust": 3,
                    "windBearing": 102,
                    "cloudCover": 0.28,
                    "uvIndex": 0,
                    "visibility": 9.82,
                    "ozone": 296.35
                },
                {
                    "time": 1544626800,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0003,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 39.27,
                    "apparentTemperature": 39.27,
                    "dewPoint": 35.78,
                    "humidity": 0.87,
                    "pressure": 1016.1,
                    "windSpeed": 2.16,
                    "windGust": 3.2,
                    "windBearing": 118,
                    "cloudCover": 0.25,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 297.31
                },
                {
                    "time": 1544630400,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0002,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 42.84,
                    "apparentTemperature": 41.42,
                    "dewPoint": 37.51,
                    "humidity": 0.81,
                    "pressure": 1015.71,
                    "windSpeed": 3.14,
                    "windGust": 5.82,
                    "windBearing": 168,
                    "cloudCover": 0.29,
                    "uvIndex": 1,
                    "visibility": 10,
                    "ozone": 298
                },
                {
                    "time": 1544634000,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0003,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 46.59,
                    "apparentTemperature": 44.82,
                    "dewPoint": 39.43,
                    "humidity": 0.76,
                    "pressure": 1014.57,
                    "windSpeed": 4.15,
                    "windGust": 7.07,
                    "windBearing": 165,
                    "cloudCover": 0.27,
                    "uvIndex": 2,
                    "visibility": 10,
                    "ozone": 298.31
                },
                {
                    "time": 1544637600,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0005,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 49.38,
                    "apparentTemperature": 46.58,
                    "dewPoint": 40.27,
                    "humidity": 0.71,
                    "pressure": 1014.08,
                    "windSpeed": 6.71,
                    "windGust": 8.71,
                    "windBearing": 164,
                    "cloudCover": 0.37,
                    "uvIndex": 2,
                    "visibility": 10,
                    "ozone": 298.81
                },
                {
                    "time": 1544641200,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0004,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 52.16,
                    "apparentTemperature": 52.16,
                    "dewPoint": 41.78,
                    "humidity": 0.68,
                    "pressure": 1013.02,
                    "windSpeed": 8.19,
                    "windGust": 11,
                    "windBearing": 169,
                    "cloudCover": 0.37,
                    "uvIndex": 2,
                    "visibility": 10,
                    "ozone": 299.66
                },
                {
                    "time": 1544644800,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0004,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 54.02,
                    "apparentTemperature": 54.02,
                    "dewPoint": 43.17,
                    "humidity": 0.67,
                    "pressure": 1011.89,
                    "windSpeed": 9.71,
                    "windGust": 13.44,
                    "windBearing": 172,
                    "cloudCover": 0.37,
                    "uvIndex": 2,
                    "visibility": 10,
                    "ozone": 300.62
                },
                {
                    "time": 1544648400,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0005,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 55.26,
                    "apparentTemperature": 55.26,
                    "dewPoint": 44.34,
                    "humidity": 0.67,
                    "pressure": 1010.95,
                    "windSpeed": 10.6,
                    "windGust": 15.54,
                    "windBearing": 173,
                    "cloudCover": 0.38,
                    "uvIndex": 1,
                    "visibility": 10,
                    "ozone": 301.73
                },
                {
                    "time": 1544652000,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0011,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 55.12,
                    "apparentTemperature": 55.12,
                    "dewPoint": 45.29,
                    "humidity": 0.69,
                    "pressure": 1010.27,
                    "windSpeed": 10.38,
                    "windGust": 17.09,
                    "windBearing": 173,
                    "cloudCover": 0.39,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 302.9
                },
                {
                    "time": 1544655600,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-day",
                    "precipIntensity": 0.0025,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 53.51,
                    "apparentTemperature": 53.51,
                    "dewPoint": 46.02,
                    "humidity": 0.76,
                    "pressure": 1009.77,
                    "windSpeed": 9.54,
                    "windGust": 18.35,
                    "windBearing": 172,
                    "cloudCover": 0.4,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 304.2
                },
                {
                    "time": 1544659200,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0034,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 51.76,
                    "apparentTemperature": 51.76,
                    "dewPoint": 46.55,
                    "humidity": 0.82,
                    "pressure": 1009.37,
                    "windSpeed": 8.98,
                    "windGust": 19.66,
                    "windBearing": 172,
                    "cloudCover": 0.41,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 306.18
                },
                {
                    "time": 1544662800,
                    "summary": "Partly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0023,
                    "precipProbability": 0.02,
                    "precipType": "rain",
                    "temperature": 51.28,
                    "apparentTemperature": 51.28,
                    "dewPoint": 46.8,
                    "humidity": 0.85,
                    "pressure": 1009.1,
                    "windSpeed": 9.11,
                    "windGust": 21.37,
                    "windBearing": 176,
                    "cloudCover": 0.51,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 309.62
                },
                {
                    "time": 1544666400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0008,
                    "precipProbability": 0.01,
                    "precipType": "rain",
                    "temperature": 51.04,
                    "apparentTemperature": 51.04,
                    "dewPoint": 46.84,
                    "humidity": 0.85,
                    "pressure": 1008.96,
                    "windSpeed": 9.54,
                    "windGust": 23.06,
                    "windBearing": 182,
                    "cloudCover": 0.63,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 313.82
                },
                {
                    "time": 1544670000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 51.02,
                    "apparentTemperature": 51.02,
                    "dewPoint": 46.7,
                    "humidity": 0.85,
                    "pressure": 1008.71,
                    "windSpeed": 9.87,
                    "windGust": 24.14,
                    "windBearing": 187,
                    "cloudCover": 0.72,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 316.72
                },
                {
                    "time": 1544673600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 50.58,
                    "apparentTemperature": 50.58,
                    "dewPoint": 46.32,
                    "humidity": 0.85,
                    "pressure": 1008.28,
                    "windSpeed": 9.96,
                    "windGust": 24.04,
                    "windBearing": 189,
                    "cloudCover": 0.72,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 317.68
                },
                {
                    "time": 1544677200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 49.8,
                    "apparentTemperature": 45.81,
                    "dewPoint": 45.78,
                    "humidity": 0.86,
                    "pressure": 1007.76,
                    "windSpeed": 9.96,
                    "windGust": 23.32,
                    "windBearing": 188,
                    "cloudCover": 0.68,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 317.44
                },
                {
                    "time": 1544680800,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 49.5,
                    "apparentTemperature": 45.5,
                    "dewPoint": 45.55,
                    "humidity": 0.86,
                    "pressure": 1007.27,
                    "windSpeed": 9.77,
                    "windGust": 23.02,
                    "windBearing": 182,
                    "cloudCover": 0.67,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 316.37
                },
                {
                    "time": 1544684400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 49.43,
                    "apparentTemperature": 45.69,
                    "dewPoint": 46.14,
                    "humidity": 0.88,
                    "pressure": 1006.79,
                    "windSpeed": 8.99,
                    "windGust": 24.5,
                    "windBearing": 170,
                    "cloudCover": 0.73,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 314.22
                },
                {
                    "time": 1544688000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0,
                    "precipProbability": 0,
                    "temperature": 49.7,
                    "apparentTemperature": 46.42,
                    "dewPoint": 47.02,
                    "humidity": 0.9,
                    "pressure": 1006.34,
                    "windSpeed": 7.96,
                    "windGust": 26.35,
                    "windBearing": 188,
                    "cloudCover": 0.81,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 311.4
                },
                {
                    "time": 1544691600,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0002,
                    "precipProbability": 0.05,
                    "precipType": "rain",
                    "temperature": 49.57,
                    "apparentTemperature": 46.29,
                    "dewPoint": 47.11,
                    "humidity": 0.91,
                    "pressure": 1006.16,
                    "windSpeed": 7.87,
                    "windGust": 25.96,
                    "windBearing": 212,
                    "cloudCover": 0.87,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 308.62
                },
                {
                    "time": 1544695200,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0023,
                    "precipProbability": 0.12,
                    "precipType": "rain",
                    "temperature": 48.86,
                    "apparentTemperature": 45.03,
                    "dewPoint": 45.93,
                    "humidity": 0.9,
                    "pressure": 1006.37,
                    "windSpeed": 8.88,
                    "windGust": 20.17,
                    "windBearing": 138,
                    "cloudCover": 0.85,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 306.46
                },
                {
                    "time": 1544698800,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0096,
                    "precipProbability": 0.31,
                    "precipType": "rain",
                    "temperature": 47.6,
                    "apparentTemperature": 42.81,
                    "dewPoint": 43.96,
                    "humidity": 0.87,
                    "pressure": 1006.87,
                    "windSpeed": 10.71,
                    "windGust": 12.31,
                    "windBearing": 33,
                    "cloudCover": 0.79,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 304.45
                },
                {
                    "time": 1544702400,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.017,
                    "precipProbability": 0.45,
                    "precipType": "rain",
                    "temperature": 45.83,
                    "apparentTemperature": 39.66,
                    "dewPoint": 41.83,
                    "humidity": 0.86,
                    "pressure": 1007.6,
                    "windSpeed": 13.69,
                    "windGust": 13.71,
                    "windBearing": 358,
                    "cloudCover": 0.78,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 303.16
                },
                {
                    "time": 1544706000,
                    "summary": "Mostly Cloudy",
                    "icon": "partly-cloudy-night",
                    "precipIntensity": 0.0163,
                    "precipProbability": 0.41,
                    "precipType": "rain",
                    "temperature": 43.69,
                    "apparentTemperature": 35.79,
                    "dewPoint": 39.68,
                    "humidity": 0.86,
                    "pressure": 1008.64,
                    "windSpeed": 17.99,
                    "windGust": 18.94,
                    "windBearing": 349,
                    "cloudCover": 0.84,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 303.01
                },
                {
                    "time": 1544709600,
                    "summary": "Breezy and Mostly Cloudy",
                    "icon": "wind",
                    "precipIntensity": 0.0131,
                    "precipProbability": 0.28,
                    "precipType": "rain",
                    "temperature": 40.92,
                    "apparentTemperature": 31,
                    "dewPoint": 37.33,
                    "humidity": 0.87,
                    "pressure": 1009.91,
                    "windSpeed": 23.11,
                    "windGust": 32.04,
                    "windBearing": 350,
                    "cloudCover": 0.93,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 303.53
                },
                {
                    "time": 1544713200,
                    "summary": "Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.0114,
                    "precipProbability": 0.23,
                    "precipType": "rain",
                    "temperature": 38.71,
                    "apparentTemperature": 27.26,
                    "dewPoint": 35.31,
                    "humidity": 0.87,
                    "pressure": 1011.11,
                    "windSpeed": 27.02,
                    "windGust": 42.69,
                    "windBearing": 353,
                    "cloudCover": 1,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 304.24
                },
                {
                    "time": 1544716800,
                    "summary": "Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.0115,
                    "precipProbability": 0.28,
                    "precipType": "rain",
                    "temperature": 36.96,
                    "apparentTemperature": 24.62,
                    "dewPoint": 33.89,
                    "humidity": 0.89,
                    "pressure": 1012.19,
                    "windSpeed": 28.44,
                    "windGust": 46.38,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 1,
                    "visibility": 10,
                    "ozone": 304.93
                },
                {
                    "time": 1544720400,
                    "summary": "Dangerously Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.0184,
                    "precipProbability": 0.4,
                    "precipType": "rain",
                    "temperature": 35.72,
                    "apparentTemperature": 22.94,
                    "dewPoint": 32.87,
                    "humidity": 0.89,
                    "pressure": 1013.18,
                    "windSpeed": 28.51,
                    "windGust": 47.03,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 2,
                    "visibility": 9.44,
                    "ozone": 305.7
                },
                {
                    "time": 1544724000,
                    "summary": "Dangerously Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.0263,
                    "precipProbability": 0.48,
                    "precipType": "rain",
                    "temperature": 34.86,
                    "apparentTemperature": 21.77,
                    "dewPoint": 31.96,
                    "humidity": 0.89,
                    "pressure": 1013.78,
                    "windSpeed": 28.52,
                    "windGust": 47.77,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 2,
                    "visibility": 8.11,
                    "ozone": 306.54
                },
                {
                    "time": 1544727600,
                    "summary": "Dangerously Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.0239,
                    "precipProbability": 0.43,
                    "precipType": "rain",
                    "temperature": 35.05,
                    "apparentTemperature": 21.93,
                    "dewPoint": 31.12,
                    "humidity": 0.85,
                    "pressure": 1013.64,
                    "windSpeed": 29.02,
                    "windGust": 49.61,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 2,
                    "visibility": 8.05,
                    "ozone": 306.99
                },
                {
                    "time": 1544731200,
                    "summary": "Dangerously Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.0213,
                    "precipProbability": 0.34,
                    "precipType": "rain",
                    "temperature": 35.95,
                    "apparentTemperature": 23.06,
                    "dewPoint": 30.32,
                    "humidity": 0.8,
                    "pressure": 1013.12,
                    "windSpeed": 29.45,
                    "windGust": 51.45,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 2,
                    "visibility": 8.51,
                    "ozone": 307.37
                },
                {
                    "time": 1544734800,
                    "summary": "Dangerously Windy and Overcast",
                    "icon": "wind",
                    "precipIntensity": 0.025,
                    "precipProbability": 0.3,
                    "precipType": "rain",
                    "temperature": 37.47,
                    "apparentTemperature": 25.11,
                    "dewPoint": 29.42,
                    "humidity": 0.72,
                    "pressure": 1012.95,
                    "windSpeed": 29.56,
                    "windGust": 52.85,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 1,
                    "visibility": 8.69,
                    "ozone": 308.07
                },
                {
                    "time": 1544738400,
                    "summary": "Light Rain and Dangerously Windy",
                    "icon": "rain",
                    "precipIntensity": 0.0353,
                    "precipProbability": 0.3,
                    "precipType": "rain",
                    "temperature": 38.75,
                    "apparentTemperature": 26.9,
                    "dewPoint": 28.37,
                    "humidity": 0.66,
                    "pressure": 1013.54,
                    "windSpeed": 29.25,
                    "windGust": 53.59,
                    "windBearing": 351,
                    "cloudCover": 1,
                    "uvIndex": 0,
                    "visibility": 8.16,
                    "ozone": 309.37
                },
                {
                    "time": 1544742000,
                    "summary": "Possible Light Rain and Dangerously Windy",
                    "icon": "rain",
                    "precipIntensity": 0.0531,
                    "precipProbability": 0.29,
                    "precipType": "rain",
                    "temperature": 39.53,
                    "apparentTemperature": 28.07,
                    "dewPoint": 27.41,
                    "humidity": 0.61,
                    "pressure": 1014.49,
                    "windSpeed": 28.64,
                    "windGust": 53.95,
                    "windBearing": 350,
                    "cloudCover": 1,
                    "uvIndex": 0,
                    "visibility": 7.4,
                    "ozone": 310.98
                },
                {
                    "time": 1544745600,
                    "summary": "Rain and Dangerously Windy",
                    "icon": "rain",
                    "precipIntensity": 0.0643,
                    "precipProbability": 0.23,
                    "precipType": "rain",
                    "temperature": 39.67,
                    "apparentTemperature": 28.35,
                    "dewPoint": 26.51,
                    "humidity": 0.59,
                    "pressure": 1015.38,
                    "windSpeed": 28.09,
                    "windGust": 54.31,
                    "windBearing": 350,
                    "cloudCover": 1,
                    "uvIndex": 0,
                    "visibility": 7.57,
                    "ozone": 311.88
                },
                {
                    "time": 1544749200,
                    "summary": "Rain and Dangerously Windy",
                    "icon": "rain",
                    "precipIntensity": 0.0534,
                    "precipProbability": 0.19,
                    "precipType": "rain",
                    "temperature": 39.24,
                    "apparentTemperature": 27.85,
                    "dewPoint": 25.62,
                    "humidity": 0.58,
                    "pressure": 1016.02,
                    "windSpeed": 27.65,
                    "windGust": 54.67,
                    "windBearing": 351,
                    "cloudCover": 0.97,
                    "uvIndex": 0,
                    "visibility": 9.51,
                    "ozone": 311.39
                },
                {
                    "time": 1544752800,
                    "summary": "Possible Light Rain and Dangerously Windy",
                    "icon": "rain",
                    "precipIntensity": 0.0338,
                    "precipProbability": 0.14,
                    "precipType": "rain",
                    "temperature": 38.4,
                    "apparentTemperature": 26.8,
                    "dewPoint": 24.75,
                    "humidity": 0.58,
                    "pressure": 1016.58,
                    "windSpeed": 27.25,
                    "windGust": 54.88,
                    "windBearing": 351,
                    "cloudCover": 0.93,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 310.09
                },
                {
                    "time": 1544756400,
                    "summary": "Dangerously Windy and Mostly Cloudy",
                    "icon": "wind",
                    "precipIntensity": 0.0204,
                    "precipProbability": 0.08,
                    "precipType": "rain",
                    "temperature": 37.65,
                    "apparentTemperature": 25.85,
                    "dewPoint": 23.88,
                    "humidity": 0.57,
                    "pressure": 1017.07,
                    "windSpeed": 26.95,
                    "windGust": 54.79,
                    "windBearing": 352,
                    "cloudCover": 0.88,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 309.76
                },
                {
                    "time": 1544760000,
                    "summary": "Dangerously Windy and Mostly Cloudy",
                    "icon": "wind",
                    "precipIntensity": 0.0132,
                    "precipProbability": 0.05,
                    "precipType": "rain",
                    "temperature": 37.06,
                    "apparentTemperature": 25.07,
                    "dewPoint": 23.15,
                    "humidity": 0.57,
                    "pressure": 1017.52,
                    "windSpeed": 26.86,
                    "windGust": 54.21,
                    "windBearing": 353,
                    "cloudCover": 0.83,
                    "uvIndex": 0,
                    "visibility": 10,
                    "ozone": 310.99
                }
            ]
        },
        "daily": {
            "summary": "Rain on Thursday and next Tuesday, with high temperatures bottoming out at 46°F on Friday.",
            "icon": "rain",
            "data": [
                {
                    "time": 1544508000,
                    "summary": "Mostly cloudy overnight.",
                    "icon": "partly-cloudy-night",
                    "sunriseTime": 1544535013,
                    "sunsetTime": 1544570359,
                    "moonPhase": 0.14,
                    "precipIntensity": 0,
                    "precipIntensityMax": 0,
                    "precipProbability": 0,
                    "temperatureHigh": 58.02,
                    "temperatureHighTime": 1544558400,
                    "temperatureLow": 36.88,
                    "temperatureLowTime": 1544623200,
                    "apparentTemperatureHigh": 58.02,
                    "apparentTemperatureHighTime": 1544558400,
                    "apparentTemperatureLow": 36.17,
                    "apparentTemperatureLowTime": 1544616000,
                    "dewPoint": 30.54,
                    "humidity": 0.6,
                    "pressure": 1020.82,
                    "windSpeed": 12.65,
                    "windGust": 31.55,
                    "windGustTime": 1544554800,
                    "windBearing": 196,
                    "cloudCover": 0.03,
                    "uvIndex": 3,
                    "uvIndexTime": 1544551200,
                    "visibility": 10,
                    "ozone": 279.88,
                    "temperatureMin": 29.73,
                    "temperatureMinTime": 1544511600,
                    "temperatureMax": 58.02,
                    "temperatureMaxTime": 1544558400,
                    "apparentTemperatureMin": 23.83,
                    "apparentTemperatureMinTime": 1544522400,
                    "apparentTemperatureMax": 58.02,
                    "apparentTemperatureMaxTime": 1544558400
                },
                {
                    "time": 1544594400,
                    "summary": "Partly cloudy throughout the day.",
                    "icon": "partly-cloudy-day",
                    "sunriseTime": 1544621456,
                    "sunsetTime": 1544656770,
                    "moonPhase": 0.17,
                    "precipIntensity": 0.0007,
                    "precipIntensityMax": 0.0034,
                    "precipIntensityMaxTime": 1544659200,
                    "precipProbability": 0.11,
                    "precipType": "rain",
                    "temperatureHigh": 55.26,
                    "temperatureHighTime": 1544648400,
                    "temperatureLow": 40.92,
                    "temperatureLowTime": 1544709600,
                    "apparentTemperatureHigh": 55.26,
                    "apparentTemperatureHighTime": 1544648400,
                    "apparentTemperatureLow": 31,
                    "apparentTemperatureLowTime": 1544709600,
                    "dewPoint": 41.16,
                    "humidity": 0.81,
                    "pressure": 1013.22,
                    "windSpeed": 6.37,
                    "windGust": 24.14,
                    "windGustTime": 1544670000,
                    "windBearing": 184,
                    "cloudCover": 0.48,
                    "uvIndex": 2,
                    "uvIndexTime": 1544634000,
                    "visibility": 10,
                    "ozone": 299.25,
                    "temperatureMin": 36.88,
                    "temperatureMinTime": 1544623200,
                    "temperatureMax": 55.26,
                    "temperatureMaxTime": 1544648400,
                    "apparentTemperatureMin": 36.17,
                    "apparentTemperatureMinTime": 1544616000,
                    "apparentTemperatureMax": 55.26,
                    "apparentTemperatureMaxTime": 1544648400
                },
                {
                    "time": 1544680800,
                    "summary": "Dangerously windy throughout the day and rain starting in the afternoon, continuing until evening.",
                    "icon": "rain",
                    "sunriseTime": 1544707898,
                    "sunsetTime": 1544743184,
                    "moonPhase": 0.2,
                    "precipIntensity": 0.0199,
                    "precipIntensityMax": 0.0643,
                    "precipIntensityMaxTime": 1544745600,
                    "precipProbability": 0.92,
                    "precipType": "rain",
                    "temperatureHigh": 43.69,
                    "temperatureHighTime": 1544706000,
                    "temperatureLow": 31.08,
                    "temperatureLowTime": 1544788800,
                    "apparentTemperatureHigh": 35.79,
                    "apparentTemperatureHighTime": 1544706000,
                    "apparentTemperatureLow": 17.93,
                    "apparentTemperatureLowTime": 1544788800,
                    "dewPoint": 34.23,
                    "humidity": 0.77,
                    "pressure": 1011.85,
                    "windSpeed": 18.54,
                    "windGust": 54.88,
                    "windGustTime": 1544752800,
                    "windBearing": 352,
                    "cloudCover": 0.9,
                    "uvIndex": 2,
                    "uvIndexTime": 1544720400,
                    "visibility": 10,
                    "ozone": 308.45,
                    "temperatureMin": 34.86,
                    "temperatureMinTime": 1544724000,
                    "temperatureMax": 49.7,
                    "temperatureMaxTime": 1544688000,
                    "apparentTemperatureMin": 21.77,
                    "apparentTemperatureMinTime": 1544724000,
                    "apparentTemperatureMax": 46.42,
                    "apparentTemperatureMaxTime": 1544688000
                },
                {
                    "time": 1544767200,
                    "summary": "Windy until afternoon and partly cloudy throughout the day.",
                    "icon": "wind",
                    "sunriseTime": 1544794338,
                    "sunsetTime": 1544829599,
                    "moonPhase": 0.23,
                    "precipIntensity": 0.003,
                    "precipIntensityMax": 0.0062,
                    "precipIntensityMaxTime": 1544803200,
                    "precipProbability": 0.1,
                    "precipType": "rain",
                    "temperatureHigh": 45.99,
                    "temperatureHighTime": 1544821200,
                    "temperatureLow": 32.44,
                    "temperatureLowTime": 1544878800,
                    "apparentTemperatureHigh": 38.26,
                    "apparentTemperatureHighTime": 1544824800,
                    "apparentTemperatureLow": 25.16,
                    "apparentTemperatureLowTime": 1544875200,
                    "dewPoint": 23.06,
                    "humidity": 0.56,
                    "pressure": 1020.87,
                    "windSpeed": 20.55,
                    "windGust": 52.72,
                    "windGustTime": 1544767200,
                    "windBearing": 344,
                    "cloudCover": 0.48,
                    "uvIndex": 2,
                    "uvIndexTime": 1544806800,
                    "visibility": 10,
                    "ozone": 319.67,
                    "temperatureMin": 31.08,
                    "temperatureMinTime": 1544788800,
                    "temperatureMax": 45.99,
                    "temperatureMaxTime": 1544821200,
                    "apparentTemperatureMin": 17.93,
                    "apparentTemperatureMinTime": 1544788800,
                    "apparentTemperatureMax": 38.26,
                    "apparentTemperatureMaxTime": 1544824800
                },
                {
                    "time": 1544853600,
                    "summary": "Mostly cloudy starting in the afternoon.",
                    "icon": "partly-cloudy-night",
                    "sunriseTime": 1544880777,
                    "sunsetTime": 1544916016,
                    "moonPhase": 0.26,
                    "precipIntensity": 0,
                    "precipIntensityMax": 0,
                    "precipProbability": 0,
                    "temperatureHigh": 57.35,
                    "temperatureHighTime": 1544907600,
                    "temperatureLow": 43.35,
                    "temperatureLowTime": 1544968800,
                    "apparentTemperatureHigh": 57.35,
                    "apparentTemperatureHighTime": 1544907600,
                    "apparentTemperatureLow": 39.34,
                    "apparentTemperatureLowTime": 1544968800,
                    "dewPoint": 26.64,
                    "humidity": 0.52,
                    "pressure": 1022.15,
                    "windSpeed": 3.77,
                    "windGust": 30.62,
                    "windGustTime": 1544853600,
                    "windBearing": 307,
                    "cloudCover": 0.43,
                    "uvIndex": 3,
                    "uvIndexTime": 1544896800,
                    "visibility": 10,
                    "ozone": 290.06,
                    "temperatureMin": 32.44,
                    "temperatureMinTime": 1544878800,
                    "temperatureMax": 57.35,
                    "temperatureMaxTime": 1544907600,
                    "apparentTemperatureMin": 25.16,
                    "apparentTemperatureMinTime": 1544875200,
                    "apparentTemperatureMax": 57.35,
                    "apparentTemperatureMaxTime": 1544907600
                },
                {
                    "time": 1544940000,
                    "summary": "Mostly cloudy starting in the evening.",
                    "icon": "partly-cloudy-night",
                    "sunriseTime": 1544967214,
                    "sunsetTime": 1545002435,
                    "moonPhase": 0.29,
                    "precipIntensity": 0,
                    "precipIntensityMax": 0.0001,
                    "precipIntensityMaxTime": 1544972400,
                    "precipProbability": 0,
                    "temperatureHigh": 60.55,
                    "temperatureHighTime": 1544994000,
                    "temperatureLow": 36.88,
                    "temperatureLowTime": 1545048000,
                    "apparentTemperatureHigh": 60.55,
                    "apparentTemperatureHighTime": 1544994000,
                    "apparentTemperatureLow": 34.27,
                    "apparentTemperatureLowTime": 1545048000,
                    "dewPoint": 30.91,
                    "humidity": 0.49,
                    "pressure": 1024.81,
                    "windSpeed": 1.61,
                    "windGust": 11.72,
                    "windGustTime": 1544940000,
                    "windBearing": 48,
                    "cloudCover": 0.52,
                    "uvIndex": 3,
                    "uvIndexTime": 1544983200,
                    "visibility": 10,
                    "ozone": 290.87,
                    "temperatureMin": 42.62,
                    "temperatureMinTime": 1545022800,
                    "temperatureMax": 60.55,
                    "temperatureMaxTime": 1544994000,
                    "apparentTemperatureMin": 39.34,
                    "apparentTemperatureMinTime": 1544968800,
                    "apparentTemperatureMax": 60.55,
                    "apparentTemperatureMaxTime": 1544994000
                },
                {
                    "time": 1545026400,
                    "summary": "Mostly cloudy throughout the day.",
                    "icon": "partly-cloudy-day",
                    "sunriseTime": 1545053650,
                    "sunsetTime": 1545088856,
                    "moonPhase": 0.32,
                    "precipIntensity": 0.0001,
                    "precipIntensityMax": 0.0002,
                    "precipIntensityMaxTime": 1545044400,
                    "precipProbability": 0.06,
                    "precipType": "rain",
                    "temperatureHigh": 58.07,
                    "temperatureHighTime": 1545080400,
                    "temperatureLow": 46.38,
                    "temperatureLowTime": 1545109200,
                    "apparentTemperatureHigh": 58.07,
                    "apparentTemperatureHighTime": 1545080400,
                    "apparentTemperatureLow": 42.46,
                    "apparentTemperatureLowTime": 1545141600,
                    "dewPoint": 33.82,
                    "humidity": 0.64,
                    "pressure": 1026.12,
                    "windSpeed": 4.28,
                    "windGust": 14.01,
                    "windGustTime": 1545109200,
                    "windBearing": 117,
                    "cloudCover": 0.81,
                    "uvIndex": 2,
                    "uvIndexTime": 1545066000,
                    "visibility": 10,
                    "ozone": 288.15,
                    "temperatureMin": 36.88,
                    "temperatureMinTime": 1545048000,
                    "temperatureMax": 58.07,
                    "temperatureMaxTime": 1545080400,
                    "apparentTemperatureMin": 34.27,
                    "apparentTemperatureMinTime": 1545048000,
                    "apparentTemperatureMax": 58.07,
                    "apparentTemperatureMaxTime": 1545080400
                },
                {
                    "time": 1545112800,
                    "summary": "Rain starting in the afternoon, continuing until evening.",
                    "icon": "rain",
                    "sunriseTime": 1545140085,
                    "sunsetTime": 1545175279,
                    "moonPhase": 0.36,
                    "precipIntensity": 0.0148,
                    "precipIntensityMax": 0.0675,
                    "precipIntensityMaxTime": 1545174000,
                    "precipProbability": 0.43,
                    "precipType": "rain",
                    "temperatureHigh": 59.53,
                    "temperatureHighTime": 1545166800,
                    "temperatureLow": 48.39,
                    "temperatureLowTime": 1545228000,
                    "apparentTemperatureHigh": 59.53,
                    "apparentTemperatureHighTime": 1545166800,
                    "apparentTemperatureLow": 44.54,
                    "apparentTemperatureLowTime": 1545228000,
                    "dewPoint": 44.58,
                    "humidity": 0.78,
                    "pressure": 1022.84,
                    "windSpeed": 9.6,
                    "windGust": 23.45,
                    "windGustTime": 1545188400,
                    "windBearing": 157,
                    "cloudCover": 0.55,
                    "uvIndex": 2,
                    "uvIndexTime": 1545152400,
                    "visibility": 10,
                    "ozone": 289.92,
                    "temperatureMin": 46.4,
                    "temperatureMinTime": 1545112800,
                    "temperatureMax": 59.53,
                    "temperatureMaxTime": 1545166800,
                    "apparentTemperatureMin": 42.46,
                    "apparentTemperatureMinTime": 1545141600,
                    "apparentTemperatureMax": 59.53,
                    "apparentTemperatureMaxTime": 1545166800
                }
            ]
        },
        "flags": {
            "sources": [
                "nearest-precip",
                "nwspa",
                "cmc",
                "gfs",
                "hrrr",
                "icon",
                "isd",
                "madis",
                "nam",
                "sref",
                "darksky"
            ],
            "nearest-station": 4.076,
            "units": "us"
        },
        "offset": -6
    };