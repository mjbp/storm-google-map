(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormGoogleMap = require('./libs/storm-google-map');

var _stormGoogleMap2 = _interopRequireDefault(_stormGoogleMap);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
    _stormGoogleMap2.default.init('#js-map', [{
        id: "Storm",
        title: "StormId",
        location: {
            lat: 55.9749013,
            lng: -3.1669848
        }
    }, {
        id: "Waverley",
        title: "Waverley Station",
        location: {
            lat: 55.9519979,
            lng: -3.1899702
        }
    }]);
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
    onDOMContentLoadedTasks.forEach(function (fn) {
        return fn();
    });
});

},{"./libs/storm-google-map":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var CONSTANTS = {
    GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$',
    INFOBOX: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/a2cdc955fcd20d47db28db645e63f0d2054070c9/1.1.9/src/infobox_packed.js',
    CLUSTERER: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/df501fcbc3e7513d6a94718ab6673de47c202255/1.0.2/src/markerclusterer_compiled.js',
    SPIDIFIER: 'https://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js'
},
    defaults = {
    key: null,
    modules: {
        infobox: true,
        clusterer: true,
        spidifier: true
    },
    map: {
        options: {
            scaleControl: false,
            mapTypeControl: false,
            overviewMapControl: true,
            panControl: false,
            rotateControl: false,
            streetViewControl: true,
            maxZoom: 16,
            zoomControl: true,
            styles: [{ stylers: [{ visibility: "on" }, { saturation: -100, hue: '#000000' }] }, { featureType: "road.local", stylers: [{ visibility: "simplified" }] }, { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }, { featureType: "landscape.man_made", stylers: [{ visibility: "on" }] }, { featureType: "transit", stylers: [{ visibility: "on" }] }]
        },
        markerIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
    },
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
        template: '<div class="infobox"><div class="infobox-inner" id="infobox"><a href="{{url}}"><h1 class="infobox-heading">{{title}}</h1></a></div></div>',
        closeIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
        urlBase: '/',
        boxStyle: {
            width: '250px',
            opacity: 1
        },
        pixelOffset: [-115, -10]
    }
},
    StormGoogleMap = {
    init: function init() {
        this.markers = [];
        this.locations = locations;
        this.element = element;
        this.createMarkers();
        this.map = new google.maps.Map(element, this.settings.map.options);

        if (!!settings.modules.spidifier) {
            this.initSpidifier();
        }
        this.placeMarkers();

        if (!!settings.modules.clusterer) {
            this.markerCluster = new MarkerClusterer(this.map, this.markers, this.settings.clusterer);
        }
        this.setBoundary();
    },
    createMarkers: function createMarkers() {
        this.boundary = new google.maps.LatLngBounds();
        this.markers = this.locations.map(function (m) {
            var latLng = new google.maps.LatLng(m.location.lat, m.location.lng),
                infoBoxData = {};

            for (var d in m) {
                if (m.hasOwnProperty(d) && d !== 'location') {
                    infoBoxData[d] = m[d];
                }
            }

            this.boundary.extend(latLng);
            return new google.maps.Marker({
                position: latLng,
                clickable: this.settings.modules.infobox,
                infoBoxData: infoBoxData,
                icon: {
                    url: this.settings.map.markerIcon,
                    scaledSize: new google.maps.Size(24, 24)
                },
                optimized: false
            });
        }.bind(this));
    },
    setBoundary: function setBoundary() {
        if (this.markers.length > 1) {
            this.map.fitBounds(this.boundary);
        } else {
            this.map.setCenter(this.boundary.getCenter());
            this.map.setZoom(this.zoom);
        }
    },
    placeMarkers: function placeMarkers() {
        this.markers.forEach(function (marker) {
            marker.setMap(this.map);
            if (!!this.settings.modules.spidifier) {
                this.spidifier.addMarker(marker);
            } else {
                if (!!this.settings.modules.infobox) {
                    google.maps.event.addListener(marker, 'click', this.clickMarker);
                }
            }
        }.bind(this));
    },
    initSpidifier: function initSpidifier() {
        this.spidifier = new OverlappingMarkerSpiderfier(this.map, this.settings.spiderifier);

        if (!!this.settings.modules.infobox) {
            this.spidifier.addListener('click', function (marker, event) {
                this.clickMarker.call(marker);
            }.bind(this));
        }
    },
    clearMarkers: function clearMarkers() {
        if (this.markers.length > 0) {
            this.markers.forEach(function (marker) {
                marker.setMap(null);
            });
            this.markers.length = 0;
            this.spidifier.clearMarkers();
        }
    },
    clickMarker: function clickMarker() {
        var overlay = {
            parseTemplate: function parseTemplate(template, data) {
                for (var i in data) {
                    if (data.hasOwnProperty(i)) {
                        template = template.split('{{' + i + '}}').join(data[i]);
                    }
                }
                return template;
            }
        };

        if (!!this.infobox) {
            this.infobox.close(self.map, this);
        }

        this.infobox = new InfoBox({
            content: overlay.parseTemplate(settings.infobox.template, this.infoBoxData),
            disableAutoPan: false,
            zIndex: null,
            maxWidth: 0,
            boxStyle: settings.infobox.boxStyle,
            pixelOffset: new google.maps.Size(settings.infobox.pixelOffset[0], settings.infobox.pixelOffset[1]),
            alignBottom: true,
            closeBoxMargin: '4px 4px 4px 4px',
            isHidden: false,
            closeBoxURL: settings.infobox.closeIcon,
            infoBoxClearance: new google.maps.Size(1, 1),
            pane: 'floatPane',
            enableEventPropagation: false
        });
        this.infobox.open(this.map, this);
        google.maps.event.addListener(this.map, 'click', function () {
            this.infobox.close(this.map);
        }.bind(this));
    }
}; /**
    * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
    * @version 0.1.2: Mon, 09 Jan 2017 18:17:24 GMT
    * @author stormid
    * @license MIT
    */

var settings = {},
    locations = [],
    element = false;

var run = function run() {};

var init = function init(sel, locs, opts) {
    var el = document.querySelector(sel),
        APIPath = CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

    if (!el) throw new Error('No DOM element supplied to contain map');
    if (!opts || !opts.key) console.warn('Google Maps JS API requires a key outwith localhost');

    settings = Object.assign({}, defaults, opts);
    locations = locs;
    element = el;
    window.$__GMAPILoaded__$ = run;

    (0, _stormLoad2.default)([APIPath]).then(function () {
        var modules = ['infobox', 'clusterer', 'spidifier'],
            dependencies = modules.filter(function (module) {
            return settings.modules[module] === true;
        }).map(function (module) {
            return CONSTANTS[module.toUpperCase()];
        });
        (0, _stormLoad2.default)(dependencies).then(function () {
            console.log('ready');
        }).catch(function (e) {
            el.innerHTML = '<b>' + e + '/b>';
            console.log(e);
        });
    }).catch(function (e) {
        el.innerHTML = '<b>' + e + '/b>';
        console.log(e);
    });
};

/*

    function create(opts) {
        return Object.assign(Object.create(StormGoogleMaps), {
            settings: Object.assign({}, defaults, opts)
        }).init();
    }

    function appendScript(src, cb) {
        var script = document.createElement('script'),
            timer = window.setTimeout(function() {
                throw new Error('Script ' + src + ' failed to load in time.');
            }, CONSTANTS.TIMEOUT);
        script.src = src;
        script.onload = function() {
            window.clearTimeout(timer);
            !!cb && cb();
        };
        document.body.appendChild(script);
    };

    function $__GMAPILoaded__$(){
        var total = 0,
            loaded = 0,
            then = function(){
                loaded++;
                if(loaded === total){
                    delete window.$__GMAPILoaded__$;
                    return create(settings);
                }
            },
            curriedAppendScript = function(s){
                return appendScript(s, then);
            };
        
        for (var m in settings.modules) {
            if(settings.modules.hasOwnProperty(m) && !!settings.modules[m]){
                total++;
                curriedAppendScript(CONSTANTS[m.toUpperCase()]);
            } 
        }
        
        if(total === 0){
            return create(settings);
        }
    }

	function init(sel, locs, opts) {
        var el = document.querySelector(sel),
            APIPath = CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

        if(!el) {
            throw new Error('No DOM element supplied to contain map');
        }
        settings = Object.assign({}, defaults, opts);
        locations = locs;
        element = el;
		window.$__GMAPILoaded__$ = $__GMAPILoaded__$;
		
        appendScript(APIPath);
	}

    */

exports.default = { init: init };

},{"storm-load":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @name storm-load: Lightweight promise-based script loader
 * @version 0.2.5: Mon, 09 Jan 2017 18:08:37 GMT
 * @author stormid
 * @license MIT
 */
var create = function create(url) {
    return new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = url;
        document.head.appendChild(script);
        script.onload = script.onerror = resolve;
    });
};

var synchronous = exports.synchronous = function synchronous(urls) {
    return new Promise(function (resolve, reject) {
        var next = function next() {
            if (!urls.length) return resolve();
            var url = urls.shift();
            create(url).then(next);
        };
        next();
    });
};

exports.default = function (urls) {
    var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!async) return synchronous(urls);

    return new Promise(function (resolve, reject) {
        if (!!!Array.isArray(urls)) return reject();

        return Promise.all(urls.map(function (url) {
            return create(url);
        })).then(resolve, reject);
    });
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL3N0b3JtLWdvb2dsZS1tYXAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFDbkM7NkJBQUEsQUFBVSxLQUFWLEFBQWU7WUFDWCxBQUNRLEFBQ0o7ZUFGSixBQUVXLEFBQ1A7O2lCQUFXLEFBQ0YsQUFDTDtpQkFBSyxDQU5TLEFBQ3RCLEFBR2UsQUFFRDtBQUZDLEFBQ1A7QUFKUixBQUNJLEtBRmtCO1lBU3RCLEFBQ1EsQUFDSjtlQUZKLEFBRVcsQUFDUDs7aUJBQVcsQUFDRixBQUNMO2lCQUFLLENBZGpCLEFBQTBCLEFBU3RCLEFBR2UsQUFFRCxBQUlyQjtBQU5zQixBQUNQO0FBSlIsQUFDSTtBQVhaLEFBQWdDLENBQUE7O0FBcUJoQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFOzRCQUFBLEFBQXdCLFFBQVEsVUFBQSxBQUFDLElBQUQ7ZUFBQSxBQUFRO0FBQXhDLEFBQWdEO0FBQXBHLENBQUE7Ozs7Ozs7OztBQ2pCakM7Ozs7Ozs7O0FBRUEsSUFBTTtXQUFZLEFBQ0gsQUFDUDthQUZVLEFBRUQsQUFDVDtlQUhVLEFBR0MsQUFDWDtlQUpSLEFBQWtCLEFBSUM7QUFKRCxBQUNWO0lBS0o7U0FBVyxBQUNGLEFBQ0w7O2lCQUFTLEFBQ0ksQUFDVDttQkFGSyxBQUVNLEFBQ1g7bUJBTEcsQUFFRSxBQUdNLEFBRWY7QUFMUyxBQUNMOzs7MEJBS1UsQUFDUSxBQUNkOzRCQUZNLEFBRVUsQUFDaEI7Z0NBSE0sQUFHYyxBQUNwQjt3QkFKTSxBQUlNLEFBQ1o7MkJBTE0sQUFLUyxBQUNmOytCQU5NLEFBTWEsQUFD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UDs7QUFFM0IsZUFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFLLEdBQUwsQ0FBUyxlQUFPO0FBQ3ZCLG1CQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0gsU0FGVSxDQUFaLEVBR0UsSUFIRixDQUdPLE9BSFAsRUFHZ0IsTUFIaEIsQ0FBUDtBQUlILEtBUE0sQ0FBUDtBQVFILEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEdvb2dsZU1hcCBmcm9tICcuL2xpYnMvc3Rvcm0tZ29vZ2xlLW1hcCc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcbiAgICBHb29nbGVNYXAuaW5pdCgnI2pzLW1hcCcsIFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiU3Rvcm1cIixcbiAgICAgICAgICAgIHRpdGxlOiBcIlN0b3JtSWRcIixcbiAgICAgICAgICAgIGxvY2F0aW9uIDogeyBcbiAgICAgICAgICAgICAgICBsYXQ6IDU1Ljk3NDkwMTMsXG4gICAgICAgICAgICAgICAgbG5nOiAtMy4xNjY5ODQ4XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIldhdmVybGV5XCIsXG4gICAgICAgICAgICB0aXRsZTogXCJXYXZlcmxleSBTdGF0aW9uXCIsXG4gICAgICAgICAgICBsb2NhdGlvbiA6IHtcbiAgICAgICAgICAgICAgICBsYXQ6IDU1Ljk1MTk5NzksXG4gICAgICAgICAgICAgICAgbG5nOiAtMy4xODk5NzAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdKTtcbn1dO1xuICAgIFxuaWYoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goKGZuKSA9PiBmbigpKTsgfSk7IiwiLyoqXG4gKiBAbmFtZSBzdG9ybS1nb29nbGUtbWFwOiBHb29nbGUgTWFwcyBBUEkgbG9hZGVyIGFuZCBhYnN0cmFjdGlvbiBsYXllciB3aXRoIHNwaWRlcmluZywgY2x1c3RlcmluZyBhbmQgaW5mb2JveFxuICogQHZlcnNpb24gMC4xLjI6IE1vbiwgMDkgSmFuIDIwMTcgMTg6MTc6MjQgR01UXG4gKiBAYXV0aG9yIHN0b3JtaWRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5pbXBvcnQgTG9hZCBmcm9tICdzdG9ybS1sb2FkJztcblxuY29uc3QgQ09OU1RBTlRTID0ge1xuICAgICAgICBHTUFQSTogJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2NhbGxiYWNrPSRfX0dNQVBJTG9hZGVkX18kJyxcbiAgICAgICAgSU5GT0JPWDogJ2h0dHBzOi8vY2RuLnJhd2dpdC5jb20vZ29vZ2xlbWFwcy92My11dGlsaXR5LWxpYnJhcnkvYTJjZGM5NTVmY2QyMGQ0N2RiMjhkYjY0NWU2M2YwZDIwNTQwNzBjOS8xLjEuOS9zcmMvaW5mb2JveF9wYWNrZWQuanMnLFxuICAgICAgICBDTFVTVEVSRVI6ICdodHRwczovL2Nkbi5yYXdnaXQuY29tL2dvb2dsZW1hcHMvdjMtdXRpbGl0eS1saWJyYXJ5L2RmNTAxZmNiYzNlNzUxM2Q2YTk0NzE4YWI2NjczZGU0N2MyMDIyNTUvMS4wLjIvc3JjL21hcmtlcmNsdXN0ZXJlcl9jb21waWxlZC5qcycsXG4gICAgICAgIFNQSURJRklFUjogJ2h0dHBzOi8vamF3ai5naXRodWIuaW8vT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyL2Jpbi9vbXMubWluLmpzJ1xuICAgIH0sXG4gICAgZGVmYXVsdHMgPSB7XG4gICAgICAgIGtleTogbnVsbCxcbiAgICAgICAgbW9kdWxlczoge1xuICAgICAgICAgICAgaW5mb2JveDogdHJ1ZSxcbiAgICAgICAgICAgIGNsdXN0ZXJlcjogdHJ1ZSxcbiAgICAgICAgICAgIHNwaWRpZmllcjogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBtYXAgOiB7XG4gICAgICAgICAgICBvcHRpb25zIDoge1xuICAgICAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgICAgIG92ZXJ2aWV3TWFwQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYW5Db250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb3RhdGVDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhab29tOiAxNixcbiAgICAgICAgICAgICAgICB6b29tQ29udHJvbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdHlsZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgIHtzdHlsZXJzOiBbe3Zpc2liaWxpdHk6IFwib25cIn0sIHtzYXR1cmF0aW9uOiAtMTAwLCBodWU6ICcjMDAwMDAwJyB9XX0sXG4gICAgICAgICAgICAgICAgICAgIHtmZWF0dXJlVHlwZTogXCJyb2FkLmxvY2FsXCIsIHN0eWxlcnM6IFt7IHZpc2liaWxpdHk6IFwic2ltcGxpZmllZFwiIH1dfSxcbiAgICAgICAgICAgICAgICAgICAge2ZlYXR1cmVUeXBlOiBcInBvaVwiLCBlbGVtZW50VHlwZTogXCJsYWJlbHNcIiwgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogXCJvZmZcIiB9XX0sXG4gICAgICAgICAgICAgICAgICAgIHtmZWF0dXJlVHlwZTogXCJsYW5kc2NhcGUubWFuX21hZGVcIiwgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogXCJvblwiIH1dfSxcbiAgICAgICAgICAgICAgICAgICAge2ZlYXR1cmVUeXBlOiBcInRyYW5zaXRcIiwgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogXCJvblwiIH1dfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXJrZXJJY29uIDogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PVVTLUFTQ0lJLCUzQ3N2ZyUyMGZpbGwlM0QlMjIlMjMwMDAwMDAlMjIlMjBoZWlnaHQlM0QlMjIyNCUyMiUyMHZpZXdCb3glM0QlMjIwJTIwMCUyMDI0JTIwMjQlMjIlMjB3aWR0aCUzRCUyMjI0JTIyJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTNFJTBBJTIwJTIwJTIwJTIwJTNDcGF0aCUyMGQlM0QlMjJNMTIlMjAyQzguMTMlMjAyJTIwNSUyMDUuMTMlMjA1JTIwOWMwJTIwNS4yNSUyMDclMjAxMyUyMDclMjAxM3M3LTcuNzUlMjA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wJTIwOS41Yy0xLjM4JTIwMC0yLjUtMS4xMi0yLjUtMi41czEuMTItMi41JTIwMi41LTIuNSUyMDIuNSUyMDEuMTIlMjAyLjUlMjAyLjUtMS4xMiUyMDIuNS0yLjUlMjAyLjV6JTIyLyUzRSUwQSUyMCUyMCUyMCUyMCUzQ3BhdGglMjBkJTNEJTIyTTAlMjAwaDI0djI0SDB6JTIyJTIwZmlsbCUzRCUyMm5vbmUlMjIvJTNFJTBBJTNDL3N2ZyUzRSdcbiAgICAgICAgfSxcbiAgICAgICAgc3BpZGVyaWZpZXIgOiB7XG4gICAgICAgICAgICBrZWVwU3BpZGVyZmllZDogdHJ1ZSxcbiAgICAgICAgICAgIG1hcmtlcnNXb250TW92ZTogdHJ1ZSxcbiAgICAgICAgICAgIG1hcmtlcnNXb250SGlkZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjbHVzdGVyZXIgOiB7XG4gICAgICAgICAgICBtYXhab29tOiAxMixcbiAgICAgICAgICAgIGdyaWRTaXplOiAyMFxuICAgICAgICB9LFxuICAgICAgICBpbmZvYm94OiB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJpbmZvYm94XCI+PGRpdiBjbGFzcz1cImluZm9ib3gtaW5uZXJcIiBpZD1cImluZm9ib3hcIj48YSBocmVmPVwie3t1cmx9fVwiPjxoMSBjbGFzcz1cImluZm9ib3gtaGVhZGluZ1wiPnt7dGl0bGV9fTwvaDE+PC9hPjwvZGl2PjwvZGl2PicsXG4gICAgICAgICAgICBjbG9zZUljb24gOiAnZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVMtQVNDSUksJTNDc3ZnJTIwZmlsbCUzRCUyMiUyM0ZGRkZGRiUyMiUyMGhlaWdodCUzRCUyMjE4JTIyJTIwdmlld0JveCUzRCUyMjAlMjAwJTIwMjQlMjAyNCUyMiUyMHdpZHRoJTNEJTIyMTglMjIlMjB4bWxucyUzRCUyMmh0dHAlM0EvL3d3dy53My5vcmcvMjAwMC9zdmclMjIlM0UlMEElMjAlMjAlMjAlMjAlM0NwYXRoJTIwZCUzRCUyMk0xOSUyMDYuNDFMMTcuNTklMjA1JTIwMTIlMjAxMC41OSUyMDYuNDElMjA1JTIwNSUyMDYuNDElMjAxMC41OSUyMDEyJTIwNSUyMDE3LjU5JTIwNi40MSUyMDE5JTIwMTIlMjAxMy40MSUyMDE3LjU5JTIwMTklMjAxOSUyMDE3LjU5JTIwMTMuNDElMjAxMnolMjIvJTNFJTBBJTIwJTIwJTIwJTIwJTNDcGF0aCUyMGQlM0QlMjJNMCUyMDBoMjR2MjRIMHolMjIlMjBmaWxsJTNEJTIybm9uZSUyMi8lM0UlMEElM0Mvc3ZnJTNFJyxcbiAgICAgICAgICAgIHVybEJhc2U6ICcvJyxcbiAgICAgICAgICAgIGJveFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6JzI1MHB4JyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGl4ZWxPZmZzZXQ6IFstMTE1LCAtMTBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFN0b3JtR29vZ2xlTWFwID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJzID0gW107XG4gICAgICAgICAgICB0aGlzLmxvY2F0aW9ucyA9IGxvY2F0aW9ucztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcmtlcnMoKTtcbiAgICAgICAgICAgIHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbGVtZW50LCB0aGlzLnNldHRpbmdzLm1hcC5vcHRpb25zKTtcbiAgICBcbiAgICAgICAgICAgIGlmKCEhc2V0dGluZ3MubW9kdWxlcy5zcGlkaWZpZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRTcGlkaWZpZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGxhY2VNYXJrZXJzKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCEhc2V0dGluZ3MubW9kdWxlcy5jbHVzdGVyZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlckNsdXN0ZXIgPSBuZXcgTWFya2VyQ2x1c3RlcmVyKHRoaXMubWFwLCB0aGlzLm1hcmtlcnMsIHRoaXMuc2V0dGluZ3MuY2x1c3RlcmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0Qm91bmRhcnkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlTWFya2VyczogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHRoaXMuYm91bmRhcnkgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtlcnMgPSB0aGlzLmxvY2F0aW9ucy5tYXAoZnVuY3Rpb24obSl7XG4gICAgICAgICAgICAgICAgdmFyIGxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobS5sb2NhdGlvbi5sYXQsIG0ubG9jYXRpb24ubG5nKSxcbiAgICAgICAgICAgICAgICAgICAgaW5mb0JveERhdGEgPSB7fTtcblxuICAgICAgICAgICAgICAgIGZvcih2YXIgZCBpbiBtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG0uaGFzT3duUHJvcGVydHkoZCkgJiYgZCAhPT0gJ2xvY2F0aW9uJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvQm94RGF0YVtkXSA9IG1bZF07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpcy5ib3VuZGFyeS5leHRlbmQobGF0TG5nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBsYXRMbmcsXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdGhpcy5zZXR0aW5ncy5tb2R1bGVzLmluZm9ib3gsXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb3hEYXRhIDogaW5mb0JveERhdGEsXG4gICAgICAgICAgICAgICAgICAgIGljb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy5zZXR0aW5ncy5tYXAubWFya2VySWNvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDI0LDI0KVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvcHRpbWl6ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBzZXRCb3VuZGFyeTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubWFya2Vycy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZml0Qm91bmRzKHRoaXMuYm91bmRhcnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5zZXRDZW50ZXIodGhpcy5ib3VuZGFyeS5nZXRDZW50ZXIoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0Wm9vbSh0aGlzLnpvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbGFjZU1hcmtlcnM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmZvckVhY2goZnVuY3Rpb24obWFya2VyKXtcbiAgICAgICAgICAgICAgICBtYXJrZXIuc2V0TWFwKHRoaXMubWFwKTtcbiAgICAgICAgICAgICAgICBpZighIXRoaXMuc2V0dGluZ3MubW9kdWxlcy5zcGlkaWZpZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zcGlkaWZpZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoISF0aGlzLnNldHRpbmdzLm1vZHVsZXMuaW5mb2JveCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCB0aGlzLmNsaWNrTWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluaXRTcGlkaWZpZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5zcGlkaWZpZXIgPSBuZXcgT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyKHRoaXMubWFwLCB0aGlzLnNldHRpbmdzLnNwaWRlcmlmaWVyKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoISF0aGlzLnNldHRpbmdzLm1vZHVsZXMuaW5mb2JveCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3BpZGlmaWVyLmFkZExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKG1hcmtlciwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGlja01hcmtlci5jYWxsKG1hcmtlcik7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXJNYXJrZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlcil7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGlkaWZpZXIuY2xlYXJNYXJrZXJzKCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjbGlja01hcmtlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgb3ZlcmxheSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VUZW1wbGF0ZSA6IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBkYXRhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUuc3BsaXQoJ3t7JyArIGkgKyAnfX0nKS5qb2luKGRhdGFbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICghIXRoaXMuaW5mb2JveCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5mb2JveC5jbG9zZShzZWxmLm1hcCwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW5mb2JveCA9IG5ldyBJbmZvQm94KHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBvdmVybGF5LnBhcnNlVGVtcGxhdGUoc2V0dGluZ3MuaW5mb2JveC50ZW1wbGF0ZSwgdGhpcy5pbmZvQm94RGF0YSksXG4gICAgICAgICAgICAgICAgZGlzYWJsZUF1dG9QYW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIHpJbmRleDogbnVsbCxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogMCxcbiAgICAgICAgICAgICAgICBib3hTdHlsZTogc2V0dGluZ3MuaW5mb2JveC5ib3hTdHlsZSxcbiAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoc2V0dGluZ3MuaW5mb2JveC5waXhlbE9mZnNldFswXSwgc2V0dGluZ3MuaW5mb2JveC5waXhlbE9mZnNldFsxXSksXG4gICAgICAgICAgICAgICAgYWxpZ25Cb3R0b206IHRydWUsXG4gICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICc0cHggNHB4IDRweCA0cHgnLFxuICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjbG9zZUJveFVSTDogc2V0dGluZ3MuaW5mb2JveC5jbG9zZUljb24sXG4gICAgICAgICAgICAgICAgaW5mb0JveENsZWFyYW5jZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMSwgMSksXG4gICAgICAgICAgICAgICAgcGFuZTogJ2Zsb2F0UGFuZScsXG4gICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5pbmZvYm94Lm9wZW4odGhpcy5tYXAsIHRoaXMpO1xuICAgICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5tYXAsICdjbGljaycsIGZ1bmN0aW9uICgpIHt0aGlzLmluZm9ib3guY2xvc2UodGhpcy5tYXApOyB9LmJpbmQodGhpcykpO1xuICAgICAgICBcbiAgICAgICAgfVxuICAgIH07XG5sZXQgc2V0dGluZ3MgPSB7fSxcbiAgICBsb2NhdGlvbnMgPSBbXSxcbiAgICBlbGVtZW50ID0gZmFsc2U7XG5cbmNvbnN0IHJ1biA9ICgpID0+IHtcblxufTtcblxuY29uc3QgaW5pdCA9IChzZWwsIGxvY3MsIG9wdHMpID0+IHtcbiAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCksXG4gICAgICAgIEFQSVBhdGggPSBDT05TVEFOVFMuR01BUEkgKyAoIW9wdHMgfHwgIW9wdHMua2V5ID8gJycgOiAnJmtleT0nICsgb3B0cy5rZXkpO1xuXG4gICAgaWYoIWVsKSB0aHJvdyBuZXcgRXJyb3IoJ05vIERPTSBlbGVtZW50IHN1cHBsaWVkIHRvIGNvbnRhaW4gbWFwJyk7XG4gICAgaWYoIW9wdHMgfHwgIW9wdHMua2V5KSBjb25zb2xlLndhcm4oJ0dvb2dsZSBNYXBzIEpTIEFQSSByZXF1aXJlcyBhIGtleSBvdXR3aXRoIGxvY2FsaG9zdCcpO1xuICAgIFxuICAgIHNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMpO1xuICAgIGxvY2F0aW9ucyA9IGxvY3M7XG4gICAgZWxlbWVudCA9IGVsO1xuICAgIHdpbmRvdy4kX19HTUFQSUxvYWRlZF9fJCA9IHJ1bjtcbiAgICBcbiAgICBMb2FkKFtBUElQYXRoXSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgbGV0IG1vZHVsZXMgPSBbJ2luZm9ib3gnLCAnY2x1c3RlcmVyJywgJ3NwaWRpZmllciddLFxuICAgICAgICAgICAgICAgIGRlcGVuZGVuY2llcyA9IG1vZHVsZXMuZmlsdGVyKG1vZHVsZSA9PiBzZXR0aW5ncy5tb2R1bGVzW21vZHVsZV0gPT09IHRydWUpLm1hcChtb2R1bGUgPT4gQ09OU1RBTlRTW21vZHVsZS50b1VwcGVyQ2FzZSgpXSk7XG4gICAgICAgICAgICBMb2FkKGRlcGVuZGVuY2llcylcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFkeScpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGA8Yj4ke2V9L2I+YDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gYDxiPiR7ZX0vYj5gO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgIH0pO1xufVxuXG4vKlxuXG4gICAgZnVuY3Rpb24gY3JlYXRlKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShTdG9ybUdvb2dsZU1hcHMpLCB7XG4gICAgICAgICAgICBzZXR0aW5nczogT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdHMpXG4gICAgICAgIH0pLmluaXQoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRTY3JpcHQoc3JjLCBjYikge1xuICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JyksXG4gICAgICAgICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2NyaXB0ICcgKyBzcmMgKyAnIGZhaWxlZCB0byBsb2FkIGluIHRpbWUuJyk7XG4gICAgICAgICAgICB9LCBDT05TVEFOVFMuVElNRU9VVCk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgISFjYiAmJiBjYigpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uICRfX0dNQVBJTG9hZGVkX18kKCl7XG4gICAgICAgIHZhciB0b3RhbCA9IDAsXG4gICAgICAgICAgICBsb2FkZWQgPSAwLFxuICAgICAgICAgICAgdGhlbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgbG9hZGVkKys7XG4gICAgICAgICAgICAgICAgaWYobG9hZGVkID09PSB0b3RhbCl7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3cuJF9fR01BUElMb2FkZWRfXyQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGUoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXJyaWVkQXBwZW5kU2NyaXB0ID0gZnVuY3Rpb24ocyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFwcGVuZFNjcmlwdChzLCB0aGVuKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBmb3IgKHZhciBtIGluIHNldHRpbmdzLm1vZHVsZXMpIHtcbiAgICAgICAgICAgIGlmKHNldHRpbmdzLm1vZHVsZXMuaGFzT3duUHJvcGVydHkobSkgJiYgISFzZXR0aW5ncy5tb2R1bGVzW21dKXtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIGN1cnJpZWRBcHBlbmRTY3JpcHQoQ09OU1RBTlRTW20udG9VcHBlckNhc2UoKV0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYodG90YWwgPT09IDApe1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZShzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9XG5cblx0ZnVuY3Rpb24gaW5pdChzZWwsIGxvY3MsIG9wdHMpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpLFxuICAgICAgICAgICAgQVBJUGF0aCA9IENPTlNUQU5UUy5HTUFQSSArICghb3B0cyB8fCAhb3B0cy5rZXkgPyAnJyA6ICcma2V5PScgKyBvcHRzLmtleSk7XG5cbiAgICAgICAgaWYoIWVsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIERPTSBlbGVtZW50IHN1cHBsaWVkIHRvIGNvbnRhaW4gbWFwJyk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cyk7XG4gICAgICAgIGxvY2F0aW9ucyA9IGxvY3M7XG4gICAgICAgIGVsZW1lbnQgPSBlbDtcblx0XHR3aW5kb3cuJF9fR01BUElMb2FkZWRfXyQgPSAkX19HTUFQSUxvYWRlZF9fJDtcblx0XHRcbiAgICAgICAgYXBwZW5kU2NyaXB0KEFQSVBhdGgpO1xuXHR9XG5cbiAgICAqL1xuICAgIFxuZXhwb3J0IGRlZmF1bHQgeyBpbml0IH07IiwiLyoqXG4gKiBAbmFtZSBzdG9ybS1sb2FkOiBMaWdodHdlaWdodCBwcm9taXNlLWJhc2VkIHNjcmlwdCBsb2FkZXJcbiAqIEB2ZXJzaW9uIDAuMi41OiBNb24sIDA5IEphbiAyMDE3IDE4OjA4OjM3IEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuY29uc3QgY3JlYXRlID0gdXJsID0+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zcmMgPSB1cmw7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbmVycm9yID0gcmVzb2x2ZTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IHN5bmNocm9ub3VzID0gdXJscyA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgbGV0IG5leHQgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXVybHMubGVuZ3RoKSByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgbGV0IHVybCA9IHVybHMuc2hpZnQoKTtcbiAgICAgICAgICAgIGNyZWF0ZSh1cmwpLnRoZW4obmV4dCk7XG4gICAgICAgIH07XG4gICAgICAgIG5leHQoKTtcbiAgICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh1cmxzLCBhc3luYyA9IHRydWUpID0+IHtcbiAgICBpZiAoIWFzeW5jKSByZXR1cm4gc3luY2hyb25vdXModXJscyk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZighISFBcnJheS5pc0FycmF5KHVybHMpKSByZXR1cm4gcmVqZWN0KCk7IFxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHVybHMubWFwKHVybCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGUodXJsKTsgXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbn07Il19
