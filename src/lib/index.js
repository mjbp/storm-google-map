import { plotMarkers, drawMarkers } from './utils';
let state = {};

export default (node, locations = [], settings) => {
    state = Object.assign({}, {
                map: new google.maps.Map(node, Object.assign({}, settings.mapOptions, { styles: settings.styles }))
            }, 
            plotMarkers(settings, locations, new google.maps.LatLngBounds())
        );

    state.map.fitBounds(state.boundary);
    drawMarkers(state);
    console.log(state)
    return state
};