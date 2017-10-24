const storage = {
    saveMark: function (coords, data) {
        let marks = this.getMarks();
        let isWritten = false;

        marks.forEach(m => {
            if (m.coords.join(',') == coords.join(',')) {
                if (!m.reviews) {
                    m.reviews = [];
                }
                m.reviews.push(data);
                isWritten = true;
            }
        });

        if (!isWritten) {
            marks.push({
                coords: coords,
                reviews: [data]
            });
        }

        localStorage.marks = JSON.stringify(marks);
    },
    getMarks: function () {
        let marks = [];

        if (localStorage.marks && localStorage.marks.length) {
            marks = JSON.parse(localStorage.marks);
        }

        return marks;
    },
    getMarksByCoords: function (coords) {
        var marks = this.getMarks();
        var str = coords.join(',');
        var res = {
            coords: coords,
            reviews: []
        };

        marks.forEach(mark => {
            if (mark.coords.join(',') == str) {
                res.reviews = res.reviews.concat(mark.reviews);
            }
        });

        return res;
    }
};

module.exports = storage;