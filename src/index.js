import './index.less';
const MapController = require('./controllers/map');

window.addEventListener('DOMContentLoaded', MapController.init.bind(MapController));