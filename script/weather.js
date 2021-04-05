const COORDS_LS = 'coords';//для хранения геопозиции под этим ключом
const API_KEY = 'f78a2a81256c9f217941c132ed1252b8';//ключ, который мы получили на сервере https://home.openweathermap.org/api_keys, для получения погоды по координатом

const weatherContainer = document.querySelector('.js-weather');//находим класс js-weather

function getWeather(lat, lon) {

    //делаем запрос по данному адресу для получения погоды. then() - позволяет выполнить эту функцию только после того, как все данные будут полученны
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function (response) {
        return response.json();//записываем ответ от сервера в json
    })
    .then(function (json) {
        const temperature = json.main.temp;//записываем в переменную данные о температуре
        const place = json.name;//записываем в переменную данные о местополжении

        weatherContainer.innerText = `${temperature}  /  ${place}`;//помещаем данные на HTML страницу в тег с классом .js-weather
    })
}

function saveCoords(positionObject) {
    localStorage.setItem(COORDS_LS, JSON.stringify(positionObject));//сохраняем геопозицию в localStorage под ключом COORDS_LS
}

function geoSuccessHandler(positon) {
    const latitude = positon.coords.latitude;//передаем переменной широту
    const longitude = positon.coords.longitude;//передаем переменной долготу

    //создаем объект с геолокацией, передавая широту и долготу
    const positionObject = {
        latitude: latitude,
        longitude: longitude
    }

    saveCoords(positionObject);
    getWeather(latitude, longitude);
}

function geoErrorHandler() {
    
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(geoSuccessHandler, geoErrorHandler);//получаем текущую геопозицию
}

function getCoords() {
    const coords = localStorage.getItem(COORDS_LS);//получаем координаты из localStorage

    if (coords === null) {
        askForCoords();//запрашиваем координаты
    } else {
        const loadedCoords = JSON.parse(coords);//парсим наши координаты из localStorage
        getWeather(loadedCoords.latitude, loadedCoords.longitude);//передаем координаты полученные из localStorage
    }
}

function init() {
    getCoords();
}

init();