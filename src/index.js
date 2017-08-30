/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    if (!(array instanceof Array) || array.length < 1) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    let length = array.length;
    let res = true;

    for (let i = 0; i < length; i++) {
        res = res && fn(array[i]);
    }

    return res;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    if (!(array instanceof Array) || array.length < 1) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    let length = array.length;
    let res = false;

    for (let i = 0; i < length; i++) {
        res = res || fn(array[i]);
    }

    return res;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    let length = arguments.length;
    let res = [];

    for (let i = 1; i < length; i++) {
        try {
            fn(arguments[i]);
        }
        catch (e) {
            res.push(arguments[i]);
        }
    }

    return res;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number) {
    number = number || 0;

    if (!(!isNaN(parseFloat(number)) && isFinite(number))) {
        throw new Error('number is not a number');
    }

    return {
        sum: function () {
            let length = arguments.length;
            let res = number;

            for (let i = 0; i < length; i++) {
                res += parseFloat(arguments[i]);
            }

            return res;
        },
        dif: function () {
            let length = arguments.length;
            let res = number;

            for (let i = 0; i < length; i++) {
                res -= parseFloat(arguments[i]);
            }

            return res;

        },
        mul: function () {
            let length = arguments.length;
            let res = number;

            for (let i = 0; i < length; i++) {
                res *= parseFloat(arguments[i]);
            }

            return res;

        },
        div: function () {
            let length = arguments.length;
            let res = number;

            for (let i = 0; i < length; i++) {

                if (number == 0) {
                    throw new Error('division by 0');
                }

                if (arguments[i] == 0) {
                    throw new Error('division by 0');
                }
                res /= parseFloat(arguments[i]);
            }

            return res;

        }
    }
}

export {
  isAllTrue,
  isSomeTrue,
  returnBadArguments,
  calculator
};
