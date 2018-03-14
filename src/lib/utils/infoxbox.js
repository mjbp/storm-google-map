let activeMarker = false;

export const clickMarker = (marker, settings) => () => {
    if (activeMarker && activeMarker === marker) {
        closeInfobox();
        return;
    }
    openInfobox(marker, settings);
};

const closeInfobox = () => {
    activeMarker && activeMarker.infobox.close(activeMarker.map, activeMarker);
    activeMarker = null;
};

const openInfobox = (marker, settings) => {
    if (activeMarker) closeInfobox(activeMarker);
    activeMarker = marker;
    
    marker.infobox = createInfobox(marker, settings);
    marker.infobox.open(marker.map, marker);
    google.maps.event.addListener(marker.map, 'click', () => { closeInfobox(); });
}

const createInfobox = (marker, settings) => {
    return new InfoBox(Object.assign({}, {
        content: settings.infobox.template(marker.data),
        pixelOffset: new google.maps.Size(settings.infobox.pixelOffset[0], settings.infobox.pixelOffset[1]),
        infoBoxClearance: new google.maps.Size(1, 1)
    }, settings.infobox.options));
}
