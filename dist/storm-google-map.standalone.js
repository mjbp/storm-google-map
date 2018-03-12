/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
 * @version 0.1.2: Mon, 12 Mar 2018 22:56:59 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormGoogleMap = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @name storm-load: Lightweight promise-based script loader
 * @version 1.0.2: Fri, 09 Mar 2018 16:01:43 GMT
 * @author stormid
 * @license MIT
 */
var create = function create(url) {
    var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    return new Promise(function (resolve, reject) {
        var s = document.createElement('script');
        s.src = url;
        s.async = async;
        s.onload = s.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'complete') resolve();
        };
        s.onerror = s.onabort = reject;
        document.head.appendChild(s);
    });
};

var synchronous = function synchronous(urls) {
    return new Promise(function (resolve, reject) {
        var next = function next() {
            if (!urls.length) return resolve();
            create(urls.shift(), false).then(next).catch(reject);
        };
        next();
    });
};

var Load = function Load(urls) {
    var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    urls = [].concat(urls);
    if (!async) return synchronous(urls);

    return Promise.all(urls.map(function (url) {
        return create(url);
    }));
};

var defaults = {
    key: null,
    modules: {
        infobox: false,
        clusterer: false,
        spidifier: false
    },
    moduleBasePath: './',
    mapOptions: {
        scaleControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        overviewMapControl: true,
        panControl: false,
        rotateControl: false,
        streetViewControl: true,
        zoomControl: true,
        maxZoom: 16
    },
    markerIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
    styles: [{ stylers: [{ visibility: 'on' }, { saturation: -100, hue: '#000000' }] }, { featureType: 'road.local', stylers: [{ visibility: 'simplified' }] }, { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }, { featureType: 'landscape.man_made', stylers: [{ visibility: 'on' }] }, { featureType: 'transit', stylers: [{ visibility: 'on' }] }],
    spiderifier: {
        keepSpiderfied: true,
        markersWontMove: true,
        markersWontHide: true
    },
    clusterer: {
        maxZoom: 12,
        gridSize: 20
    },
    infobox: {
        template: '<div class="infobox"><div class="infobox-inner" id="infobox"><h1 class="infobox-heading">{{title}}</h1></div></div>',
        closeIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
        urlBase: '/',
        boxStyle: {
            width: '250px',
            opacity: 1
        },
        pixelOffset: [-115, -10]
    }
};

var libs = {
    GMAPI: '//maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$',
    INFOBOX: 'infobox.1.1.18.js',
    CLUSTERER: 'markerclusterer.1.0.1.js',
    SPIDERIFIER: 'libs/oms.1.12.2.js'
};

var plotMarkers = function plotMarkers(settings, locations, boundary) {
    var markers = locations.map(function (marker) {
        var latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng);

        boundary.extend(latLng);

        return new google.maps.Marker({
            position: latLng,
            clickable: settings.modules.infobox,
            infoBoxData: marker,
            icon: {
                url: settings.markerIcon,
                scaledSize: new google.maps.Size(24, 24)
            },
            optimized: false
        });
    });

    return {
        boundary: boundary,
        markers: markers
    };
};

var drawMarkers = function drawMarkers(state) {
    state.markers.forEach(function (marker) {
        marker.setMap(state.map);
    });
    // marker.setMap(map);
};

var state = {};

var factory = function factory(node) {
    var locations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var settings = arguments[2];

    state = Object.assign({}, {
        map: new google.maps.Map(node, Object.assign({}, settings.mapOptions, { styles: settings.styles }))
    }, plotMarkers(settings, locations, new google.maps.LatLngBounds()));

    state.map.fitBounds(state.boundary);
    drawMarkers(state);
    console.log(state);
    return state;
};

var run = function run() {
    return delete window.$__GMAPILoaded__$;
};

var init = function init(sel, locations, opts) {
    var el = document.querySelector(sel),
        APIPath = libs.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

    if (!el) return console.warn('Element could not be found with selector \'' + sel + '\'');

    window.$__GMAPILoaded__$ = run;

    var settings = Object.assign({}, defaults, opts);

    return Load([APIPath]).then(function () {
        return Load(['infobox', 'clusterer', 'spiderifier'].filter(function (module) {
            return settings.modules[module];
        }).map(function (module) {
            return '' + settings.moduleBasePath + libs[module.toUpperCase()];
        })).then(function () {
            return Object.create(factory(el, locations, Object.assign({}, defaults, opts)));
        });
    }).catch(function (e) {
        return console.log('Script loading error: ' + e.message);
    });
};

var index = { init: init };

exports.default = index;;
}));
