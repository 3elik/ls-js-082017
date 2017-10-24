const clusterer = {
    clusterer: null,
    map: null,

    init: function (map, placemarks) {
        if (!map) {
            return;
        }
        this.map = map;

        if (!placemarks || !placemarks.length) {
            placemarks = [];
        }

        let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="balloon">'+
            '<h2 class=balloon__header>{{ properties.balloonContentPlace|raw }}</h2>' +
            '<a class="balloon__link" href="#" data-coords="{{ properties.balloonContentCoords|raw }}">' +
            '{{ properties.balloonContentLink }}' +
            '</a> ' +
            '<div class=balloon__body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=balloon__footer>{{ properties.balloonContentFooter|raw }}</div>' +
            '</div>'
        );

        this.clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedDarkGreenClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: customItemContentLayout,
            clusterBalloonPanelMaxMapArea: 0,
            clusterBalloonContentLayoutWidth: 350,
            clusterBalloonContentLayoutHeight: 250,
            clusterBalloonPagerSize: 7,
            hideIconOnBalloonOpen: false
        });

        this.clusterer.add(placemarks);

        this.map.geoObjects.add(this.clusterer);
    },

    addPlacemarkToClusterer(placemark) {
        this.clusterer.add(placemark);
    },

    closeBalloon: function () {
        this.clusterer.balloon.close();
    }
};

module.exports = clusterer;