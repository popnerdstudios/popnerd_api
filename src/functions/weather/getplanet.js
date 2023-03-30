const fetch = require('node-fetch');
require('dotenv').config();


function getPlanet(weather, temp){
    const clearWeather = ["clear sky", "mist"];
    const cloudsWeather = ["few clouds", "scattered clouds", "broken clouds", "overcast clouds", "haze", "fog"];
    const drizzleWeather = ["light intensity drizzle", "drizzle", "heavy intensity drizzle", "shower rain and drizzle", "heavy shower rain and drizzle", "shower drizzle", "thunderstorm with drizzle", "light intensity drizzle rain", "drizzle rain", "heavy intensity drizzle rain"];
    const rainWeather = ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "light intensity shower rain", "shower rain", "ragged shower rain", "heavy intensity shower rain", "heavy shower rain", "thunderstorm with rain", "thunderstorm with heavy rain", "thunderstorm with light rain", "thunderstorm", "heavy thunderstorm", "ragged thunderstorm", "thunderstorm with light drizzle", "thunderstorm with drizzle", "thunderstorm with heavy drizzle", "rain and snow"];
    const snowWeather = ["light snow", "snow", "light shower snow", "sleet", "shower sleet", "light rain and snow", "heavy snow", "heavy intensity shower snow", "shower snow", "heavy shower snow"];
    const thunderstormWeather = ["squalls", "tornado","thunderstorm with rain", "thunderstorm with heavy rain", "thunderstorm with light rain", "light thunderstorm", "thunderstorm", "heavy thunderstorm", "ragged thunderstorm", "thunderstorm with light drizzle", "thunderstorm with drizzle", "thunderstorm with heavy drizzle"];
    const otherWeather = ["smoke", "volcanic ash", "sand/dust whirls", "dust", "sand"];
    
    if(clearWeather.includes(weather)){
    if(temp <= 20){
        return("Hoth");
    } else if(temp > 20 && temp <= 27){
        return("Sorgan");
    } else if(temp > 27 && temp <= 40){
        return("Alderaan");
    } else if(temp > 40 && temp <= 55){
        return("Naboo");
    } else if(temp > 55 && temp <= 65){
        return("Endor");
    } else if(temp > 65 && temp <= 75){
        return("Scarif");
    } else if(temp > 75 && temp <= 85){
        return("Coruscant");
    } else if(temp > 85 && temp <= 95){
        return("Nevarro");
    } else if(temp >= 95){
        return("Tatooine");
    }
    } else if(cloudsWeather.includes(weather)){
    if(weather == "fog"){
        return("Dagobah")
    } else if(temp <= 20){
        return("Hoth");
    } else if(temp <= 27){
        return("Sorgan");
    } else if(temp > 27 && temp <= 35){
        return("Trask");
    } else if(temp > 35 && temp <= 45){
        return("Alderaan");
    } else if(temp > 45 && temp <= 55){
        return("Bespin");
    } else if(temp > 55 && temp <= 65){
        return("Kashyyyk");
    } else if(temp > 65 && temp <= 75){
        return("Corellia");
    } else if(temp > 75 && temp <= 85){
        return("Felucia");
    } else if(temp > 85 && temp <= 95){
        return("Corvus");
    } else if(temp >= 95){
        return("Mustafar");
    }
    } else if(drizzleWeather.includes(weather)){
    if(temp <= 20){
        return("Hoth");
    } else if(temp > 20 && temp <= 27){
        return("Sorgan");
    } else if(temp > 27 && temp <= 40){
        return("Alderaan");
    } else if(temp > 40 && temp <= 55){
        return("Trask");
    } else if(temp > 55 && temp <= 65){
        return("Kashyyyk");
    } else if(temp > 65 && temp <= 75){
        return("Corellia");
    } else if(temp > 75 && temp <= 85){
        return("Felucia");
    } else if(temp >= 85){
        return("Corvus");
    }
    } else if(rainWeather.includes(weather) || thunderstormWeather.includes(weather)){
    if(weather == "light rain" && temp > 32){
        return("Sorgan")
    }
    else if(temp <= 40 || thunderstormWeather.includes(weather)){
        return("Kamino");
    } else{
        return("Trask");
    }
    } else if(snowWeather.includes(weather)){
    return("Hoth");
    } else if(otherWeather.includes(weather)) {
        if(weather == "smoke" || weather == "volcanic ash"){
        return("Mustafar");
        } else if(weather == "dust"){
        return("Geonosis");
        } else{
        return("Tatooine");
        }
    }
}

function getWeather(location) {
    //const location = document.getElementById('location').value;
    //const city = "Corvallis"; // replace with the name of the city you want to get the weather for
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("RESPONSE OK")
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const weather = data.weather[0].description;
            const planet = getPlanet(weather, temperature)
            console.log(`The temperature in ${location} feels like ${planet}, at ${temperature}°F with ${weather}.`);
            return planet
        })
        .catch(error => {
            console.error("There was a problem fetching the weather data:", error);
        });
}

function getForecastResponse(location) {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            console.log("RESPONSE OK")
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const weather = data.weather[0].description;
            let response = [{"temperature": temperature, "description": weather}]
            return JSON.stringify(response)
        })
        .catch(error => {
            console.error("There was a problem fetching the weather data:", error);
        });
}

module.exports = { getPlanet, getWeather, getForecastResponse };
  