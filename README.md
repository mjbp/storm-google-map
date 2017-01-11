#Storm Google Map

[![Build Status](https://travis-ci.org/mjbp/storm-google-map.svg?branch=master)](https://travis-ci.org/mjbp/storm-google-map)
[![codecov.io](http://codecov.io/github/mjbp/storm-google-map/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-google-map?branch=master)
[![npm version](https://badge.fury.io/js/storm-google-map.svg)](https://badge.fury.io/js/storm-google-map)

Google Maps API abstraction layer, bundling Google Maps API, Infobox, Marker Clusterer and Marker Spidifier as needed in a single, easily configurable module, or a light (lite) version for a single location with only Google Maps API.

Infobox is powered by [https://github.com/googlemaps/v3-utility-library/tree/master/infobox](https://github.com/googlemaps/v3-utility-library/tree/master/infobox)
Marker spiderifying is powered by [https://github.com/jawj/OverlappingMarkerSpiderfier](https://github.com/jawj/OverlappingMarkerSpiderfier).
Clustering by [https://github.com/googlemaps/js-marker-clusterer](https://github.com/googlemaps/js-marker-clusterer)

See the options below for configuring your map.

##Example
[https://mjbp.github.io/storm-google-map](https://mjbp.github.io/storm-google-map)

##Usage
HTML
```
<div class="js-map"></div>
```

JS
```
npm install storm-google-map
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
    }])
    .then(res => {
        console.log(res);
    });

```
aynchronous browser loading (use the .standalone version in the /dist folder)
```
import Load from 'storm-load';

Load('/content/js/async/storm-guide.standalone.js')
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
                key: 'Your Google Maps API key'
            })
            .then(res => {
                console.log(res);
            });
    });
```

###Options
```
    defaults = {
            key: null,
            modules : {
                infobox: true,
                clusterer: true,
                spidifier: true
            },
            map : {
                options : {
                    scaleControl: false,
                    mapTypeControl: false,
                    overviewMapControl: true,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: true,
                    maxZoom: 16,
                    zoomControl: true,
                    scrollwheel: false,
                    styles : [
                        {stylers: [{visibility: "on"}, {saturation: -100, hue: '#000000' }]},
                        {featureType: "road.local", stylers: [{ visibility: "simplified" }]},
                        {featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]},
                        {featureType: "landscape.man_made", stylers: [{ visibility: "on" }]},
                        {featureType: "transit", stylers: [{ visibility: "on" }]}
                    ]
                },
                markerIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
            },
            spiderifier : {
                keepSpiderfied: true,
                markersWontMove: true,
                markersWontHide: true
            },
            clusterer : {
                maxZoom: 12,
                gridSize: 20
            },
            infobox: {
                template: '<div class="infobox"><div class="infobox-inner" id="infobox"><a href="{{url}}"><h1 class="infoxbox-heading">{{title}}</h1></a></div></div>',
                closeIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
                boxStyle: {
                    width:'250px',
                    opacity: 1
                },
                pixelOffset: [-115, -10]
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

##Tests
```
npm run test
```

##Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends unpon Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfils for Array functions and eventListeners.

##Dependencies
None

##License
MIT

