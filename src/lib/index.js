import { createMarkers, extendBoundary, drawMarkers, clearMarkers, initHandlers } from './markers';

let state = {};

const clear = () => {
    state = Object.assign({}, state, {
        markers: clearMarkers(state.markers),
        boundary: null,
        clusterer: state.clusterer ? (state.clusterer.clearMarkers(), null) : null,
        spiderifier: null
    });
};

const hydrate = (locations, settings, map) => {
    let markers = locations.length > 0 ? createMarkers(locations, settings) : [],
        boundary = locations.length > 0 ? extendBoundary(markers, new google.maps.LatLngBounds()) : new google.maps.LatLngBounds();

    return {
        markers,
        boundary,
        clusterer: settings.modules.clusterer ? new MarkerClusterer(map, markers, settings.clusterer) : false,
        spiderifier: settings.modules.spiderifier ? new OverlappingMarkerSpiderfier(map, settings.spiderifier) : false
    }
};

const render = () => {
    drawMarkers(state);
    state.settings.modules.infobox && initHandlers(state);
    state.map.fitBounds(state.boundary);
};

export default (node, locations = [], settings) => {
    let map = new google.maps.Map(node, Object.assign({}, settings.mapOptions, { styles: settings.styles }));
    
    state = Object.assign({ map, locations, settings }, hydrate(locations, settings, map));
    render();

    return {
        map: state.map,
        clear,
        refresh(locations){
            clear();
            state = Object.assign({}, state, hydrate(locations, state.settings, state.map));
            render();
        }
    }
};