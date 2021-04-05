const body = document.querySelector('body');//нашли эдемент на HTML
const IMAGE_NUMBER = 4;//задаем количество картинок фона

function showImage(number) {
    const img = new Image();//создаем новый объект картинки
    img.src = `images/${number + 1}.jpg`;//задаем путь к картинке
    img.classList.add('bgImage');//устанавливаем картинке CSS-свойства
    body.prepend(img);//прикрепляем картинку к body
}

function getRandom() {
    const number = Math.floor(Math.random() * IMAGE_NUMBER);//передаем переменной рандомное число от 0 до 3(целое число)
    return number;
}

function init() {
    const randomNumber = getRandom();//получаем случайное число
    showImage(randomNumber);//устанавливаем фон
}

init();