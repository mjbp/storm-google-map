export const plotMarkers = (settings, locations, boundary) => {
    let markers = locations.map(marker => {
        let latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng);

        boundary.extend(latLng);
        
        return new google.maps.Marker({
            position: latLng,
            clickable: settings.modules.infobox,
            infoBoxData : marker,
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
    // marker.setMap(map);
};