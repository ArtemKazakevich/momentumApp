//чтобы оптимизировать код, можно писать создание переменных как ниже
const clockContainer = document.querySelector('.js-clock'),//нашли класс в HTML
      clockTitle = clockContainer.querySelector('p');//нашли элемент h1 в блоке с классом .js-clock

//функция для вывода времени      
function getTime() {
    const date = new Date();
    let hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;      
    seconds = seconds < 10 ? '0'+seconds : seconds;    
    
    clockTitle.innerHTML = `${hours}:${minutes}:${seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();