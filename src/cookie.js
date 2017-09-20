/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    reloadTable();
});

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;

    document.cookie = name + '=' + value + ';';

    // addValueInput.value = '';
    // addNameInput.value = '';

    reloadTable();
});

function reloadTable() {
    let cookies = document.cookie.split('; ');
    let filteredCookies = cookies.filter((item) => {
        let filterValue = filterNameInput.value.toLowerCase().trim();

        if (filterValue.length == 0) {
            return true;
        }

        return item.toLowerCase().indexOf(filterValue) > -1 ;
    });

    listTable.innerHTML = '';

    for (let i = 0; i < filteredCookies.length; i++) {
        if (!filteredCookies[i].length) {
            continue;
        }

        let tmp = filteredCookies[i].split('=');
        let row = document.createElement('tr');
        let cellName = document.createElement('td');
        let cellValue = document.createElement('td');
        let cellBtn = document.createElement('td');
        let btnRemove = document.createElement('button');

        cellName.textContent = tmp[0];
        cellValue.textContent = tmp[1];

        btnRemove.textContent = 'Remove';
        btnRemove.classList.add('remove');
        btnRemove.setAttribute('data-name', tmp[0]);
        cellBtn.appendChild(btnRemove);

        row.appendChild(cellName);
        row.appendChild(cellValue);
        row.appendChild(cellBtn);

        listTable.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', reloadTable);

homeworkContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('remove')) {
        return;
    }
    let name = e.target.getAttribute('data-name');
    let date = new Date(1970);

    document.cookie = name + '=0; expires=' + date.toGMTString();

    reloadTable();
});