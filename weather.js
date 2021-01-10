const selectMenu = document.querySelector('.cities');
const API_KEY = '119b23ade8091d5fecb8891fdc2a324d';

async function init() {
    const cities = await getCities();

    addCitiesToSelectMenu(cities);

    selectMenu.addEventListener('change', async (event) => {
        getWeatherData(event.target.value);
    });
}

async function getCities() {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"country": "belarus"}),
    });
    const data = await response.json();

    getWeatherData(data.data[0]);
    
    return data.data;
}

function addCitiesToSelectMenu(cities) {
    cities.forEach(city => {
        const selectMenuItem = document.createElement('option');
        
        selectMenuItem.value = city;
        selectMenuItem.textContent = city;
        selectMenu.append(selectMenuItem);
    }); 
}

function showWeatherData(data) {
    const temperature = document.querySelector('.temperature');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const weatherIcon = document.querySelector('.weather-icon');

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        showWeatherData(data);
    } catch {
        alert("Can't get weather for this city");
    }
}

init();