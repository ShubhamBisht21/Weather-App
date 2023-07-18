let curCity = "meerut";
let units = 'metric'

let city = document.querySelector('.city');
let dateTime = document.querySelector('.datetime');

let forecast = document.querySelector(".forecast");
let temperature = document.querySelector(".temperature");
let icon = document.querySelector('.icon');
let minmax = document.querySelector('.minmax');
let realfeel = document.querySelector('.realfeel');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let pressure = document.querySelector('.pressure');

document.querySelector('.search').addEventListener('submit',event => {
    event.preventDefault();
    let search = document.querySelector('.searchform');
    curCity = search.value;
    getWeatherData();
    search.value = ''
});

document.querySelector('.unit_celcius').addEventListener('click',()=>{
    if (units!='metric'){
        units = 'metric'
        getWeatherData()
    }
})

document.querySelector('.unit_fahn').addEventListener('click',()=>{
    if (units!='imperial'){
        units = 'imperial'
        getWeatherData()
    }
})

function getWeatherData(){
    const API_KEY = 'ccca1ea54a09a6f323c1ea85746a09a3';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curCity}&appid=${API_KEY}&units=${units}`)
    .then(res =>res.json())
    .then(data => {
        console.log(data);
        city.innerHTML = `${data.name}`;
        dateTime.innerHTML = new Date();
        forecast.innerHTML = `<p>${data.weather[0].main}</p>`;
        temperature.innerHTML = `${data.main.temp}&#176`
        icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
        minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`;
        realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} ${units === 'imperial' ? 'mph' : 'm/s'}`;
        pressure.innerHTML = `${data.main.pressure} hPa`;
    })
    ;
}

getWeatherData();