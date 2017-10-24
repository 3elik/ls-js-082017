const template = require('../templates/comment.hbs');

const formModel = {
    form: document.getElementById('form'),
    closeForm: document.getElementById('form__close'),
    formAddress: document.getElementById('form__address'),
    commentContainers: document.getElementById('form__comments'),
    formAdd: document.getElementById('form__add'),
    inputName: document.getElementById('form__name'),
    inputPlace: document.getElementById('form__place'),
    inputComment: document.getElementById('form__comment'),
    errorContainer: document.getElementById('form__error'),

    addCommentHandler: null,

    classFormVisible: 'form--visible',
    classEmptyComments: 'form__comments--empty',

    init: function () {
        this.closeForm.addEventListener('click', this.hideForm.bind(this));
        this.formAdd.addEventListener('click', this.addComment.bind(this));
    },
    bindAddCommentEvent: function (handler) {
        this.addCommentHandler = handler;
    },

    showForm: function (address, coords, pixels, isFull) {
        this.formAddress.textContent = address;
        this.form.classList.add(this.classFormVisible);
        this.form.style.left = this.getLeftPos(pixels[0]) + 'px';
        this.form.style.top = this.getTopPos(pixels[1]) + 'px';

        this.formAdd.dataset.coords = coords;
        this.formAdd.dataset.address = address;

        if (!isFull) {
            this.commentContainers.classList.add(this.classEmptyComments);
        } else {
            this.commentContainers.classList.remove(this.classEmptyComments);
        }

        this.commentContainers.innerHTML = '';
        this.clearFields();
    },

    getTopPos(pos) {
        let bodyH = document.body.offsetHeight;
        let formH = this.form.offsetHeight;
        const z = formH + pos;

        if ( z > bodyH) {
            return bodyH - formH - 5;
        } else {
            return pos;
        }
    },

    getLeftPos(pos) {
        let bodyW = document.body.offsetWidth;
        let formW = this.form.offsetWidth;

        if ( (formW + pos) > bodyW) {
            return pos - formW - 5;
        } else {
            return pos;
        }
    },

    hideForm: function () {
        this.form.classList.remove(this.classFormVisible);
    },
    addComment: function (e) {
        let name = this.inputName.value;
        let place = this.inputPlace.value;
        let comment = this.inputComment.value;
        let address = this.formAdd.dataset.address;
        let coords = this.formAdd.dataset.coords.split(',');

        this.errorContainer.innerHTML = '';
        let err = '';

        if (!name.length) {
            err = 'Имя обязательное поле<br>';
        } else if (name.length < 3) {
            err = 'Имя дожно быть больше 2 букв<br>';
        }

        if (!place.length) {
            err += 'Место обязательное поле<br>';
        } else if (name.length < 3) {
            err += 'Место дожно быть больше 2 букв<br>';
        }

        if (!comment.length) {
            err += 'Отзыв обязательное поле<br>';
        } else if (comment.length < 3) {
            err += 'Отзыв дожен быть больше 2 букв<br>';
        }
        
        if (err.length) {
            this.errorContainer.innerHTML = err;

            return;
        }

        let date = new Date();

        const obj = {
            coords: coords,
            data: {
                name: name,
                place: place,
                comment: comment,
                address: address,
                date: date.toISOString()
            }
        };

        this.addCommentHandler(obj);

        this.addCommentToForm(obj.data);

        this.clearFields();
    },
    clearFields: function () {
        this.inputName.value = '';
        this.inputPlace.value = '';
        this.inputComment.value = '';
    },
    showFormWithComments: function (mark) {
        if (!mark) {
            return;
        }

        let address = mark.reviews[0].address;
        let coords = mark.coords;
        let pixels = mark.pixels;

        this.showForm(address, coords, pixels, true);

        let html = '';

        mark.reviews.forEach(comment => {
            comment.date = this.formatDate(comment.date);
            let commentT = template(comment);

            html += commentT;
        });

        this.commentContainers.innerHTML = html;
    },
    addCommentToForm: function (obj) {
        obj.date = this.formatDate(obj.date);
        let html = template(obj);

        this.commentContainers.classList.remove(this.classEmptyComments);

        this.commentContainers.innerHTML += html;
    },

    formatDate: function (d) {
        let date = new Date(d);

        return date.getFullYear() +
            '.' + ('0' + (date.getMonth() + 1)).slice(-2) +
            '.' + ('0' + date.getDate()).slice(-2) +
            ' ' + ('0' + date.getHours()).slice(-2) +
            ':' + ('0' + date.getMinutes()).slice(-2) +
            ':' + ('0' + date.getSeconds()).slice(-2);
    }
};

module.exports = formModel;