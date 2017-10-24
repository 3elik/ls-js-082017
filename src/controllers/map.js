const form = require('../views/form');
const map = require('../models/map');
const placemark = require('../models/placemark');
const clusterer = require('../models/clusterer');
const storage = require('../models/storage');

const MapController = {
    process: null,
    init: function () {
        const self = this;

        this.process = new Promise(resolve => {
            ymaps.ready(resolve);
        });
        this.process
            .then(() => {
                map.init();
                form.init();
            })
            .then(() => {
                map.bindMapEvent('click', self.showEmptyForm);
                map.bindEventHideForm(self.hideForm);
                map.bindEventBalloonLinkClick(self.onBalloonLinkClick);
                form.bindAddCommentEvent(self.addComment);
                placemark.setClickHandler(self.showFormWithComments);
            })
            .then(() => {
                const marks = storage.getMarks();
                let placemarks = placemark.createPlacemarkers(marks);

                clusterer.init(map.getMap(), placemarks);

                if (placemarks) {
                    map.setCenter()
                }
            })
    },
    showEmptyForm: function (e) {
        let pixels = e.get('clientPixels');
        const coords = e.get('coords');

        map.setCoords(coords);

        map.getAddress(e)
            .then(res => {
                const address = res.geoObjects.get(0).properties.get('text');
                form.showForm(address, coords, pixels);
            });
    },
    showFormWithComments: function (mark, e) {
        let pixels = e.get('clientPixels');

        mark.pixels = pixels;

        form.showFormWithComments(mark);
    },
    createPlacemarker: function (e) {
        map.addObject(placemark);
    },
    addComment: function (obj) {
        const coords = obj.coords;

        const flag = placemark.createPlacemarker(coords, obj.data);

        clusterer.addPlacemarkToClusterer(flag);

        storage.saveMark(coords, obj.data);
    },
    hideForm: function (e) {
        form.hideForm();
    },
    onBalloonLinkClick: function (coords, e) {
        let mark = storage.getMarksByCoords(coords);
        let pixels = [
            e.pageX,
            e.pageY
        ];

        mark.pixels = pixels;

        clusterer.closeBalloon();

        form.showFormWithComments(mark);
    }
};

module.exports = MapController;