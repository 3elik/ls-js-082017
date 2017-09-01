/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    let length = array.length;

    for (let i = 0; i < length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let length = array.length;
    let res = [];

    for (let i = 0; i < length; i++) {
        res.push(fn(array[i], i, array));
    }

    return res;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let i = 0;
    let prev = initial;
    let length = array.length;

    if (typeof initial === 'undefined') {
        i = 1;
        prev = array[0];
    }

    for (;i < length; i++) {
        prev = fn(prev, array[i], i, array);
    }

    return prev;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];

    return obj;
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let arr = Object.keys(obj).map(function (elem) {
        return elem.toString().toUpperCase();
    });

    return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let length = array.length;
    let start = typeof from === 'undefined' ? 0 : from;
    let end = typeof to === 'undefined' ? length : to > length ? length : to;
    let arr = [];

    if (start < 0) {
        if (Math.abs(start) > length) {
            start = 0;
        } else {
            start = length + start;
        }
    }
    if (end < 0) {
        end = length + end;
    }

    for (let i = start; i < end; i++) {
        arr.push(array[i]);
    }

    return arr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set: function (target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });
}

export {
  forEach,
  map,
  reduce,
  deleteProperty,
  hasProperty,
  getEnumProps,
  upperProps,
  slice,
  createProxy
};
