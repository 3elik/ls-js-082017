const map = {
    element: 'yandex-map',
    zoom: 10,
    center: [55.76, 37.64],
    map: null,
    clusterer: null,

    balloonLinkHandler: null,

    init: function () {
        this.map = new ymaps.Map(this.element, {
            center: this.center,
            zoom: this.zoom
        });

        let mapEl = document.getElementById(this.element);
        mapEl.addEventListener('click', this.onClustererBalloonLink.bind(this));
    },

    setCoords: function (coords) {
        this.coords = coords;
    },

    getCoords: function () {
        return this.coords
    },

    bindMapEvent: function (type, handler) {
        if (!type || !handler) {
            return;
        }
        this.map.events.add(type, handler);
    },

    bindEventBalloonLinkClick: function (handler) {
        this.balloonLinkHandler = handler;
    },

    getAddress: function (e) {
        const coords = e.get('coords');

        return ymaps.geocode(coords);
    },

    addObject: function (obj) {
        this.map.geoObjects.add(obj);
    },

    getMap: function () {
        return this.map;
    },

    bindEventHideForm: function (hideFormHandler) {
        let mapEl = document.getElementById(this.element);

        mapEl.addEventListener('click', hideFormHandler, true);
    },

    onClustererBalloonLink: function (e) {
        if (!e.target.classList.contains('balloon__link')) {
            return;
        }

        const target = e.target;
        let coords = target.dataset.coords.split(',');

        if (typeof this.balloonLinkHandler == 'function') {
            this.balloonLinkHandler(coords, e);
        }
    },

    setCenter: function () {
        if (this.map.geoObjects.getBounds()) {
            this.map.setBounds(this.map.geoObjects.getBounds());
        }
    }
};

module.exports = map;