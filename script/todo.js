const toDoForm = document.querySelector('.js-toDoForm'),//нашли класс в HTML
      toDoInput = toDoForm.querySelector('input'),//нашли input в данной форме
      toDoList = document.querySelector('.js-toDoList');//нашли класс в HTML

const TODOS_LS = 'toDos';//переменная для хранения ключа, под которым хранится список задач
let listToDos = [];//создаем масив для хранения задач

function deleteTODo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = listToDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });

    listToDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(listToDos));//сохраняем список(массив) задач в localStorage, приобразовав объект задачи в строку через JSON.stringify()
}

function showToDos(text) {
    const li = document.createElement('li');//добавляем на HTML странице тэг <li>
    const delBtn = document.createElement('button');//добавляем на HTML странице тэг <button>
    const span = document.createElement('span');//добавляем на HTML странице тэг <span>
    const newId = listToDos.length + 1;// id задачи

    delBtn.innerHTML = '❌';//прописываем символ для кнопки удаления
    delBtn.addEventListener('click', deleteTODo);

    span.innerText = text;//добавляем в span текст(задачу), которую мы прописываем
    li.appendChild(delBtn);//добавляем дочерний элемент delbtn к li
    li.appendChild(span);//добавляем дочерний элемент span к li
    li.id = newId;//добавляем id к задаче при ее создании, чтобы потом понять какую задачу удалить( <li id="1">...</li>)
    toDoList.appendChild(li);//добавляем дочерний элемент li к ul

    //создаем объект задачи с id и текстом который мы ввели
    const toDoObject = {
        id: newId,
        name: text
    }

    listToDos.push(toDoObject);//добавляем объект в массив
    saveToDos();
}

function submitHandler(event) {
    event.preventDefault();//отключает стандартное действие при нажатии enter для ввода, чтобы задать свое действие. Т.е. перезагрузка страницы при отправки формы
    const currentValue = toDoInput.value;//сохраняем в переменной значение, записанной в inpute
    showToDos(currentValue);//показываем в списке задачу
    toDoInput.value = "";//очищаем поле для ввода задачи
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_LS);//получаем список задач из localStorage

    if (toDos !== null) {
        const parsedToDos = JSON.parse(toDos);//парсим(преобразуем) список задач обратно в объект и записываем в массив parsedToDos

        //пробегаем по всем элементам массива(списку задач) и выводим текст задачи(name)
        parsedToDos.forEach(function (toDo) {
            showToDos(toDo.name)
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', submitHandler);//добавляем обработчик события отправки формы
}

init();