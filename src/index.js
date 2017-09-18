/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    let promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, seconds * 1000);
    });

    return promise;
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    let promise = new Promise(function (resolve, reject) {
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.addEventListener('load', () => {
            let cities = JSON.parse(xhr.response);

            cities.sort((a, b) => {
                return ( (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 );
            });

            resolve(cities);
        });
        xhr.addEventListener('error', () => {
            reject();
        });
        xhr.send();
    });

    return promise;
}

export {
    delayPromise,
    loadAndSortTowns
};