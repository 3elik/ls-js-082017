const placemarkModel = {
    clickHandler: null,
    setClickHandler: function (handler) {
        this.clickHandler = handler;
    },
    createPlacemarker: function (coords, data) {
        let date = new Date(data.date);
        let footerContent = date.getFullYear() +
            '.' + ('0' + (date.getMonth() + 1)).slice(-2) +
            '.' + ('0' + date.getDate()).slice(-2) +
            ' ' + ('0' + date.getHours()).slice(-2) +
            ':' + ('0' + date.getMinutes()).slice(-2) +
            ':' + ('0' + date.getSeconds()).slice(-2);

        const placemark = new ymaps.Placemark(coords,{
            balloonContentPlace: data.place,
            balloonContentCoords: coords.join(','),
            balloonContentLink: data.address,
            balloonContentBody: data.comment,
            balloonContentFooter: footerContent,
            comment: data,
            coords: coords
        }, {
            preset: 'islands#darkGreenIcon',
            draggable: false,
            hasBalloon: false,
            hasHint: false,
            openBalloonOnClick: false

        });

        placemark.events.add('click', e => {
            e.preventDefault();
            e.stopPropagation();
            let placemark = e.get('target');
            let mark = {
                coords: placemark.properties.get('coords'),
                reviews: [
                    placemark.properties.get('comment'),
                ]
            };

            if (typeof this.clickHandler == 'function') {
                this.clickHandler(mark, e);
            }
        });

        return placemark;
    },

    createPlacemarkers(marks) {
        let placemarks = [];
        const self = this;

        marks.forEach(mark => {
            mark.reviews.forEach(comment => {
                let m = self.createPlacemarker(mark.coords, comment);

                placemarks.push(m);
            })
        });

        return placemarks;
    },
};

module.exports = placemarkModel;