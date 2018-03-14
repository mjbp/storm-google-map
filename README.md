# Storm Google Map
[![npm version](https://badge.fury.io/js/storm-google-map.svg)](https://badge.fury.io/js/storm-google-map)

Google Maps API abstraction layer, bundling Google Maps API, (optionally including custom Infobox, Marker Clusterer and Marker Spidifier as needed) in a single, easily configurable module.

Infobox is powered by [https://github.com/googlemaps/v3-utility-library/tree/master/infobox](https://github.com/googlemaps/v3-utility-library/tree/master/infobox)
Marker spiderifying is powered by [https://github.com/jawj/OverlappingMarkerSpiderfier](https://github.com/jawj/OverlappingMarkerSpiderfier).
Clustering by [https://github.com/googlemaps/js-marker-clusterer](https://github.com/googlemaps/js-marker-clusterer)


## Example
[https://stormid.github.io/storm-google-map](https://stormid.github.io/storm-google-map)

## Usage
HTML
```
<div class="js-map"></div>
```

JS
```
npm i -S storm-google-map
```

either using es6 import
```
import Map from 'storm-google-map';

Map.init('.js-map', [
    {
        id: 'Storm',
        title: 'Storm Id',
        location : { 
            lat: 55.9749013,
            lng: -3.1669848
        }
    }], {
        key: '<Your Google Maps API key>'
    })
    .then(res => {
        console.log(res);
    });

```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-google-map.standalone.js')
    .then(() => {
        StormGoogleMap.init('.js-map', [
            {
                id: 'Storm',
                title: 'Storm Id',
                location : { 
                    lat: 55.9749013,
                    lng: -3.1669848
                }
            }], {
                key: '<Your Google Maps API key>'
            })
            .then(res => {
                console.log(res);
            });
    });
```

### Options
Your own Google Maps API key will be required

Infobox options are specified at http://htmlpreview.github.io/?https://github.com/googlemaps/v3-utility-library/blob/master/infobox/docs/reference.html
```
defaults = {
    key: null,
    modules: {
        infobox: false,
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
}
```
e.g.
```
Map.init('.js-map', [
    {
        id: 'Storm',
        title: 'Storm Id',
        location : { 
            lat: 55.9749013,
            lng: -3.1669848
        }
    }], {
        key: 'Your Google Maps API key',
        modules : {
            infobox: true,
            clusterer: false,
            spidifier: false
        },
    })
    .then(res => {
        console.log(res);
    });
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

This module depends upon Object.assign, element.classList, and Promises, available in all evergreen browsers. ie9+ is supported with polyfills, ie8+ will work with even more polyfills for Array functions and eventListeners.

## Dependencies
Google Maps JS API

Import storm-load(https://stormid.github.io/storm-load)


## License
MIT

