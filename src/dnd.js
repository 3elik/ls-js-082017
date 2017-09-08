/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('div');
    function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    div.classList.add('draggable-div');
    div.style.width = parseInt(Math.random() * 1000) + 'px';
    div.style.height = parseInt(Math.random() * 1000) + 'px';
    div.style.top = parseInt(Math.random() * 1000) + 'px';
    div.style.left = parseInt(Math.random() * 1000) + 'px';
    div.style.backgroundColor = getRandomColor();
    div.style.position = 'absolute';

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    let offsetX;
    let offsetY;

    let drag = function (e) {
        target.style.left = (e.pageX - offsetX) + 'px';
        target.style.top = (e.pageY - offsetY) + 'px';
    };

    document.addEventListener('mousedown', function (e) {
        if (e.target == target) {
            offsetX = e.offsetX;
            offsetY = e.offsetY;
            e.target.addEventListener('mousemove', drag);
        }
    });

    document.addEventListener('mouseup', function (e) {
        if (e.target == target) {
            e.target.removeEventListener('mousemove', drag);
            offsetX = 0;
            offsetY = 0;
        }
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
