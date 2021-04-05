const greetingsForm = document.querySelector('.js-form'),// нашли класс в HTML
      greetingsInput = greetingsForm.querySelector('input'),//нашли input который находится в форме
      greetings = document.querySelector('.js-greetings');// нашли класс в HTML
const USER_LS = 'currentUserName', //переменная для хранения ключа, для поиска имени
      SHOWING_CN = 'showing';// переменная для хранения класса, отвечающего за показ элемента

function saveUserName(text) {
    localStorage.setItem(USER_LS, text);//сохраняем имя пользователя под ключом USER_LS
}

function submitHandler(event) {
    event.preventDefault();//отключает стандартное действие при нажатии enter для ввода, чтобы задать свое действие
    const inputValue = greetingsInput.value;// получаем значение введеное в форме
    showGreeting(inputValue);//вызываем функцию 
    saveUserName(inputValue);
}

function showGreeting(text) {
    greetings.innerText = `Привет, ${text}`;//замена текста в h2
    greetings.classList.add(SHOWING_CN);// подключаем класс видимости, чтобы отобразить текст в h2
    greetingsForm.classList.remove(SHOWING_CN);//убирает форму с экрана
}

function askForUserName(params) {
    greetingsForm.classList.add(SHOWING_CN);//добавляем форму для ввода имени
    greetingsForm.addEventListener('submit', submitHandler);// добавляем событие при submit
}

//поиск ключа в localStorage(памяти браузера), под ключом лежит имя пользователя
function loadUserName() {
    const currentUserName = localStorage.getItem(USER_LS);//получаем имя из localStorage

    if (currentUserName === null) {
        askForUserName();
    } else {
        showGreeting(currentUserName);
    }
}

// 1
//функция вызывается во время загрузки страницы
function init() {
    loadUserName();
}

init();