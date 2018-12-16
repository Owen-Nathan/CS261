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
            getSevenDayForecast();
        }
    }
}
function getCurrentConditions() {
//This includes Temperature, Feels like (windchill), precipitation, wind speed and direction,humidity
    let current = weatherData.currently;
    let low = weatherData.daily.data[0].temperatureLow.toFixed(0);
    let high = weatherData.daily.data[0].temperatureHigh.toFixed(0);
    setMainDisplay({
        temp: `${current.temperature.toFixed(0)}&deg;F`,
        feelslike: `${current.apparentTemperature.toFixed(0)}&deg;F`,
        icon: `wi wi-${getConditionIcon(current.icon)}`,
        wind: `<i class="wi wi-wind towards-${current.windBearing}-deg"></i> ${current.windSpeed.toFixed(0)} MPH`,
        lowHigh: `${low}&deg;F <i class="wi wi-direction-down"></i> ${high}&deg;F <i class="wi wi-direction-up"></i>`,
        precip: `${current.precipProbability * 100}%`,
        summary: current.summary
    });


}

function setMainDisplay(weatherInfo) {
    let currentTempElement = document.getElementById('currentTemp');
    var animatedTexts = document.querySelectorAll('.main');
    animatedTexts.forEach(function(animatedText) {
        animatedText.classList.add('pre-animation');;
    });


    setTimeout(function() {
        animatedTexts.forEach(function(animatedText) {
            animatedText.classList.remove('pre-animation');
        });
        currentTempElement.innerHTML = weatherInfo.temp;
        document.getElementById('currentFeelsLike').innerHTML = weatherInfo.feelslike;
        document.getElementById('currentIcon').className = weatherInfo.icon + ' animated main';
        document.getElementById('currentWindSpeed').innerHTML = weatherInfo.wind;
        document.getElementById('currentLowHigh').innerHTML = weatherInfo.lowHigh;
        document.getElementById('currentPrecip').innerText = weatherInfo.precip;
        document.getElementById('currentSummary').innerText = weatherInfo.summary;
    },500)
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
    let dailyForecastRow = document.getElementById("dailyForecasts");
    dailyForecastRow.innerHTML = '';
    dailyForecastRow.classList.add('pre-animation');
    daily.data.forEach(function(day,index,array) {
        let low = day.temperatureLow.toFixed(0);
        let high = day.temperatureHigh.toFixed(0);
        let dayRow = document.createElement("div");

        dayRow.className = "forecastItem flexItem";
        dayRow.innerHTML = `<span class="dayLabel blackBackground">${getDay(day.time)}</span>
                             <span class="dayTempLabel">${low}&deg;F <i class="wi wi-direction-down"></i> ${high}&deg;F <i class="wi wi-direction-up"></i></span>
                             <i class="hourlyIcon wi wi-${getConditionIcon(day.icon)}"></i>`;
        dailyForecastRow.appendChild(dayRow);
    });

    setTimeout(function() {
        dailyForecastRow.classList.remove('pre-animation');

    },500)


}

function getHourlyForecast() {
    let hourly = weatherData.hourly;
    let hourlyDivRow = document.getElementById("hourlyConditions");
    hourlyDivRow.classList.add('pre-animation');
    hourlyDivRow.innerHTML = '';

    hourly.data.forEach(function(hour) {


        let hourRow = document.createElement("div");

        hourRow.onclick = function()
        {
            setMainDisplay({
                temp: `${hour.temperature.toFixed(0)}&deg;F`,
                feelslike: `${hour.apparentTemperature.toFixed(0)}&deg;F`,
                icon: `wi wi-${getConditionIcon(hour.icon)}`,
                wind: `<i class="wi wi-wind towards-${hour.windBearing}-deg"></i> ${hour.windSpeed.toFixed(0)} MPH`,
                lowHigh: ``,
                precip: `${hour.precipProbability * 100}%`,
                summary: hour.summary
            });
        };

        hourRow.className = "conditionItem flexItem";
        hourRow.innerHTML = `<span class="hourLabel blackBackground">${getTime(hour.time)}</span>
                             <span class="tempLabel">${hour.temperature.toFixed(0)}&deg;F</span>
                             <i class="hourlyIcon wi wi-${getConditionIcon(hour.icon)}"></i>
                             <span class="hourPrecip">${(hour.precipProbability * 100).toFixed(0)} <i class="wi wi-humidity"></i></span>
                             <span class="hourPrecip"><i class="wi wi-wind towards-${hour.windBearing}-deg"></i> ${hour.windSpeed.toFixed(0)}<br>mph</span>`;
        hourlyDivRow.appendChild(hourRow);
    });

    setTimeout(function() {
        hourlyDivRow.classList.remove('pre-animation');

    },500)
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

function showSearchBar() {
    let locationName = document.getElementById('locationName');
    locationName.classList.add('hidden');

    let searchBox = document.getElementById('searchBox');
    searchBox.classList.remove('hidden');
    searchBox.focus();
    searchBox.onblur = function () {
        locationName.classList.remove('hidden');
        searchBox.classList.add('hidden');
    }
}

function insertGoogleScript() {
    var google_api = document.createElement('script'),
        api_key    = 'AIzaSyC8YCaLdQcdWDF5cRrjWSvWWvA-oCXPJFw';

    // Inject the script for Google's API and reference the initGoogleAPI
    // function as a callback.
    google_api.src = 'https://maps.googleapis.com/maps/api/js?key='+ api_key +'&callback=initGoogleAPI&libraries=places,geometry';
    document.body.appendChild(google_api);
}


// SearchBox Method
function initGoogleAPI() {
    var autocomplete = new google.maps.places.SearchBox(document.getElementById('searchBox'));
    autocomplete.addListener('places_changed', function() {
        var place = autocomplete.getPlaces()[0];
        console.log(place.geometry.location.lat());
        console.log(place.geometry.location.lng());
        console.log(place);
        let locationName = document.getElementById('locationName');
        locationName.innerText = place.formatted_address;
        getForecast({coords : {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
        }});

    });
}

insertGoogleScript();