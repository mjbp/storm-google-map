/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
 * @version 0.1.2: Tue, 13 Mar 2018 22:12:53 GMT
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
        clusterer: true,
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
        gridSize: 20,
        imagePath: './',
        imageExtension: '.png'
        /*
        averageCenter: true,
        styles: {
            url: '',
            height: 30,
            width: 30,
            anchor: (Array) The anchor position of the label text.
            textColor: (string) The text color.
            textSize: (number) The text size.
            backgroundPosition: (string) The position of the backgound x, y.
        }*/
    },
    infobox: {
        template: function template(props) {
            return;
            '<div class="infobox">\n                    <div class="infobox__inner" id="infobox">\n                        <h1 class="infobox__heading">' + props.title + '</h1>\n                    </div>\n                </div>';
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
    activeMarker.infobox.close(activeMarker.map, activeMarker);
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

var plotMarkers = function plotMarkers(settings, locations, boundary) {
    var markers = locations.map(function (marker) {
        var latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng);

        boundary.extend(latLng);

        return new google.maps.Marker({
            position: latLng,
            clickable: settings.modules.infobox,
            data: marker,
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
};

var initHandlers = function initHandlers(state) {
    state.markers.forEach(function (marker) {
        if (state.settings.modules.spidifier) state.spidifier.addMarker(marker);else if (state.settings.modules.infobox) google.maps.event.addListener(marker, 'click', clickMarker(marker, state.settings));
    });
};

var state = {};

/*

clearMarkers(){
        this.markers.forEach(marker => {
            marker.setMap(null);
            google.maps.event.addListener(marker, 'click', this.clickMarker.bind(this, marker));
        });
        this.spiderifier = null;
        this.markerCluster.clearMarkers();
        this.boundary = null;
    },



    google.maps.event.addListener(this.map, 'idle', () => {
            if(this.locations.length === 0) this.map.setCenter(new google.maps.LatLng(this.settings.defaultCenter.lat, this.settings.defaultCenter.lng));
            this.mapCentre = this.map.getCenter();
        });
        google.maps.event.addDomListener(window, 'resize', () => this.map.setCenter(this.mapCentre));

refresh(locations){
        this.clearMarkers();
        this.locations = locations;
        this.initMarkers();
    },

    */
var factory = function factory(node) {
    var locations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var settings = arguments[2];

    state = Object.assign({}, {
        map: new google.maps.Map(node, Object.assign({}, settings.mapOptions, { styles: settings.styles }))
    }, { settings: settings }, plotMarkers(settings, locations, new google.maps.LatLngBounds()));

    state.map.fitBounds(state.boundary);
    drawMarkers(state);

    settings.modules.infobox && initHandlers(state);
    if (settings.modules.clusterer) state = Object.assign({}, state, {
        clusterer: new MarkerClusterer(state.map, state.markers, settings.clusterer)
    });

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
            return Object.create(factory(el, locations, settings));
        });
    }).catch(function (e) {
        return console.log('Script loading error: ' + e.message);
    });
};

var index = { init: init };

exports.default = index;;
}));
