import { clickMarker } from '../utils/infoxbox';

export const plotMarkers = (settings, locations, boundary) => {
    let markers = locations.map(marker => {
        let latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng);

        boundary.extend(latLng);
        
        return new google.maps.Marker({
            position: latLng,
            clickable: settings.modules.infobox,
            data : marker,
            icon: {
                url: settings.markerIcon,
                scaledSize: new google.maps.Size(24,24)
            },
            optimized: false,
        });
    });

    return {
        boundary,
        markers
    }
};

export const drawMarkers = state => {
    state.markers.forEach(marker => { marker.setMap(state.map)});
};

export const initHandlers = state => {
    state.markers.forEach(marker => {
        if(state.settings.modules.spidifier) state.spidifier.addMarker(marker);
        else if (state.settings.modules.infobox) google.maps.event.addListener(marker, 'click', clickMarker(marker, state.settings));
    });
};

export const clearMarkers = markers => {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    // this.spiderifier = null;
    // this.markerCluster.clearMarkers();
    // this.boundary = null;
};