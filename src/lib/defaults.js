export default {
    key: null,
    modules: {
        infobox: true,
        clusterer: false,
        spiderifier: false
    },
    moduleBasePath: './',
    defaultCenter: {
        lat: 55.9749013,
	    lng: -3.1669848
    },
    mapOptions : {
        scaleControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        overviewMapControl: true,
        panControl: false,
        rotateControl: false,
        streetViewControl: true,
        zoomControl: true,
        maxZoom: 16,
        zoom: 14
    },
    markerIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
    styles : [
        {stylers: [{visibility: 'on'}, {saturation: -100, hue: '#000000' }]},
        {featureType: 'road.local', stylers: [{ visibility: 'simplified' }]},
        {featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }]},
        {featureType: 'landscape.man_made', stylers: [{ visibility: 'on' }]},
        {featureType: 'transit', stylers: [{ visibility: 'on' }]}
    ],
    spiderifier : {
        keepSpiderfied: true,
        markersWontMove: true,
        markersWontHide: true
    },
    clusterer : {
        maxZoom: 14,
        gridSize: 20,
        imagePath: './img/m',
        imageExtension: 'png'
    },
    infobox: {
        template(props){ 
            return `<div class="infobox">
                    <div class="infobox__inner" id="infobox">
                        <h1 class="infobox__heading">${props.title}</h1>
                    </div>
                </div>`;
        },
        urlBase: '/',
        pixelOffset: [-115, -10],
        options: {
            disableAutoPan: false,
            zIndex: null,
            maxWidth: 0,
            boxStyle: {
                width:'250px',
                opacity: 1
            },
            alignBottom: true,
            closeBoxMargin: '4px 4px 4px 4px',
            isHidden: false,
            closeBoxURL: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
            pane: 'floatPane',
            enableEventPropagation: false
        }
    }
};