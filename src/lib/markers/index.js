import { clickMarker } from '../utils/infoxbox';

export const createMarkers = (locations, settings) => locations.map(place => new google.maps.Marker({
        position: new google.maps.LatLng(place.location.lat, place.location.lng),
        clickable: settings.modules.infobox,
        data : place,
        icon: {
            url: settings.markerIcon,
            scaledSize: new google.maps.Size(24,24)
        },
        optimized: false,
    })
);

export const extendBoundary = (markers, boundary) => {
    markers.map(marker => { boundary.extend(marker.position); });

    return boundary;
};

export const drawMarkers = state => {
    state.markers.forEach(marker => { 
        marker.setMap(state.map)}
    );
};

export const initHandlers = state => {
    state.markers.forEach(marker => {
        if(state.spiderifier) state.spiderifier.addMarker(marker);
        else if (state.settings.modules.infobox) google.maps.event.addListener(marker, 'click', clickMarker(marker, state.settings));
    });
    if(state.spiderifier) state.spiderifier.addListener('click', marker => clickMarker(marker, state.settings)());
};

export const clearMarkers = markers => {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    return [];
};