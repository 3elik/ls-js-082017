/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
var z = 0;
function loadTowns() {
    let promise = new Promise(function (resolve, reject) {
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.addEventListener('load', (e) => {
            cities = e.target.response || [];

            if (cities.length > 0) {
                cities.sort((a, b) => {
                    return ( (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 );
                });
            } else {
                reject();
            }

            resolve(cities);
        });
        xhr.addEventListener('error', () => {
            reject();
        });
        xhr.send();
    });

    return promise;
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (typeof full == 'undefined' || full == null) {
        return false;
    }

    return full.toLowerCase().indexOf(chunk.toLowerCase()) > -1;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();

let cities = [];

let resolveFn = (c) => {
    loadingBlock.style.display = 'none';
    errorBlock.style.display = 'none';
    filterBlock.style.display = 'block';
    cities = c || [];
};
let rejectFn = () => {
    loadingBlock.style.display = 'none';
    errorBlock.style.display = 'block';
    filterBlock.style.display = 'none';
    cities = [];
};

let errorButton = document.createElement('button');
let errorMessage = document.createElement('p');
let errorBlock = document.createElement('div');

errorMessage.textContent = 'Не удалось загрузить города';

errorButton.textContent = 'Повторить';

errorBlock.style.display = 'none';
errorBlock.appendChild(errorMessage);
errorBlock.appendChild(errorButton);

homeworkContainer.appendChild(errorBlock);

townsPromise.then(resolveFn, rejectFn);

filterInput.addEventListener('keyup', function(e) {
    let value = e.target.value.trim();

    if (value.length < 1) {
        filterResult.innerHTML = '';

        return;
    }

    let filtered = cities.filter((a) => {
        return a.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
    let html = '';

    filterResult.innerHTML = '';

    for (let i = 0; i < filtered.length; i++) {
        html += '<p>'+filtered[i].name+'</p>';
    }

    filterResult.innerHTML = html;
});

errorButton.addEventListener('click', () => {
    z++;
    loadingBlock.style.display = 'block';
    errorBlock.style.display = 'none';
    filterBlock.style.display = 'none';

    townsPromise = loadTowns();

    townsPromise.then(resolveFn, rejectFn);
});

export {
    loadTowns,
    isMatching
};
