/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and custom infobox
 * @version 1.2.2: Wed, 14 Mar 2018 16:47:58 GMT
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
        infobox: true,
        clusterer: false,
        spiderifier: false
    },
    moduleBasePath: './',
    defaultCenter: {
        lat: 55.9749013,
        lng: -3.1669848
    },
    mapOptions: {
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
    markerIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
    styles: [{ stylers: [{ visibility: 'on' }, { saturation: -100, hue: '#000000' }] }, { featureType: 'road.local', stylers: [{ visibility: 'simplified' }] }, { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }, { featureType: 'landscape.man_made', stylers: [{ visibility: 'on' }] }, { featureType: 'transit', stylers: [{ visibility: 'on' }] }],
    spiderifier: {
        keepSpiderfied: true,
        markersWontMove: true,
        markersWontHide: true
    },
    clusterer: {
        maxZoom: 14,
        gridSize: 20,
        imagePath: './img/m',
        imageExtension: 'png'
    },
    infobox: {
        template: function template(props) {
            return '<div class="infobox">\n                    <div class="infobox__inner" id="infobox">\n                        <h1 class="infobox__heading">' + props.title + '</h1>\n                    </div>\n                </div>';
        },

        urlBase: '/',
        pixelOffset: [-115, -10],
        options: {
            disableAutoPan: false,
            zIndex: null,
            maxWidth: 0,
            boxStyle: {
                width: '250px',
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

var libs = {
    GMAPI: '//maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$',
    INFOBOX: 'infobox.1.1.18.js',
    CLUSTERER: 'markerclusterer.1.0.1.js',
    SPIDERIFIER: 'oms.1.12.2.js'
};

var activeMarker = false;

var clickMarker = function clickMarker(marker, settings) {
    return function () {
        if (activeMarker && activeMarker === marker) {
            closeInfobox();
            return;
        }
        openInfobox(marker, settings);
    };
};

var closeInfobox = function closeInfobox() {
    activeMarker && activeMarker.infobox.close(activeMarker.map, activeMarker);
    activeMarker = null;
};

var openInfobox = function openInfobox(marker, settings) {
    if (activeMarker) closeInfobox(activeMarker);
    activeMarker = marker;

    marker.infobox = createInfobox(marker, settings);
    marker.infobox.open(marker.map, marker);
    google.maps.event.addListener(marker.map, 'click', function () {
        closeInfobox();
    });
};

var createInfobox = function createInfobox(marker, settings) {
    return new InfoBox(Object.assign({}, {
        content: settings.infobox.template(marker.data),
        pixelOffset: new google.maps.Size(settings.infobox.pixelOffset[0], settings.infobox.pixelOffset[1]),
        infoBoxClearance: new google.maps.Size(1, 1)
    }, settings.infobox.options));
};

var createMarkers = function createMarkers(locations, settings) {
    return locations.map(function (place) {
        return new google.maps.Marker({
            position: new google.maps.LatLng(place.location.lat, place.location.lng),
            clickable: settings.modules.infobox,
            data: place,
            icon: {
                url: settings.markerIcon,
                scaledSize: new google.maps.Size(24, 24)
            },
            optimized: false
        });
    });
};

var extendBoundary = function extendBoundary(markers, boundary) {
    markers.map(function (marker) {
        boundary.extend(marker.position);
    });

    return boundary;
};

var drawMarkers = function drawMarkers(state) {
    state.markers.forEach(function (marker) {
        marker.setMap(state.map);
    });
};

var initHandlers = function initHandlers(state) {
    state.markers.forEach(function (marker) {
        if (state.spiderifier) state.spiderifier.addMarker(marker);else if (state.settings.modules.infobox) google.maps.event.addListener(marker, 'click', clickMarker(marker, state.settings));
    });
    if (state.spiderifier) state.spiderifier.addListener('click', function (marker) {
        return clickMarker(marker, state.settings)();
    });
};

var clearMarkers = function clearMarkers(markers) {
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
    return [];
};

var state = {};

var clear = function clear() {
    state = Object.assign({}, state, {
        markers: clearMarkers(state.markers),
        boundary: null,
        clusterer: state.clusterer ? (state.clusterer.clearMarkers(), null) : null,
        spiderifier: null
    });
};

var hydrate = function hydrate(locations, settings, map) {
    var markers = locations.length > 0 ? createMarkers(locations, settings) : [],
        boundary = locations.length > 0 ? extendBoundary(markers, new google.maps.LatLngBounds()) : new google.maps.LatLngBounds();

    return {
        markers: markers,
        boundary: boundary,
        clusterer: settings.modules.clusterer ? new MarkerClusterer(map, markers, settings.clusterer) : false,
        spiderifier: settings.modules.spiderifier ? new OverlappingMarkerSpiderfier(map, settings.spiderifier) : false
    };
};

var render = function render() {
    drawMarkers(state);
    state.settings.modules.infobox && initHandlers(state);
    state.map.fitBounds(state.boundary);
};

var factory = function factory(node) {
    var locations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var settings = arguments[2];

    var map = new google.maps.Map(node, Object.assign({}, settings.mapOptions, { styles: settings.styles }));

    state = Object.assign({ map: map, locations: locations, settings: settings }, hydrate(locations, settings, map));
    render();

    return {
        map: state.map,
        clear: clear,
        refresh: function refresh(locations) {
            clear();
            state = Object.assign({}, state, hydrate(locations, state.settings, state.map));
            render();
        }
    };
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
            return factory(el, locations, settings);
        }).catch(function (e) {
            return console.warn('Script loading error: ' + e.message);
        });
    });
};

var index = { init: init };

exports.default = index;;
}));
