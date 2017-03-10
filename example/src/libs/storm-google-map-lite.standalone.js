/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
 * @version 0.1.2: Fri, 10 Feb 2017 15:30:37 GMT
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
 * @version 0.4.0: Fri, 20 Jan 2017 16:57:34 GMT
 * @author stormid
 * @license MIT
 */
var create = function create(url) {
	return new Promise(function (resolve, reject) {
		var s = document.createElement('script');
		s.src = url;
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
			create(urls.shift()).then(next).catch(reject);
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

var CONSTANTS = {
	GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$'
};
var defaults = {
	key: null,
	map: {
		options: {
			scaleControl: false,
			scrollwheel: false,
			mapTypeControl: false,
			overviewMapControl: true,
			panControl: false,
			rotateControl: false,
			streetViewControl: true,
			maxZoom: 16,
			zoomControl: true,
			styles: [{ stylers: [{ visibility: 'on' }, { saturation: -100, hue: '#000000' }] }, { featureType: 'road.local', stylers: [{ visibility: 'simplified' }] }, { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }, { featureType: 'landscape.man_made', stylers: [{ visibility: 'on' }] }, { featureType: 'transit', stylers: [{ visibility: 'on' }] }]
		},
		markerIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
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
var StormGoogleMap = {
	init: function init() {
		this.isReady = false;

		this.map = new google.maps.Map(element, this.settings.map.options);
		this.boundary = new google.maps.LatLngBounds();

		this.locations = locations;
		this.element = element;
		this.markers = this.createMarkers();

		this.attachMarkers();

		this.map.fitBounds(this.boundary);

		this.initListeners();

		return this;
	},
	createMarkers: function createMarkers() {
		var _this = this;

		return this.locations.map(function (marker) {
			var latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng);

			_this.boundary.extend(latLng);

			return new google.maps.Marker({
				position: latLng,
				clickable: false,
				icon: {
					url: _this.settings.map.markerIcon,
					scaledSize: new google.maps.Size(24, 24)
				},
				optimized: false
			});
		});
	},
	attachMarkers: function attachMarkers() {
		var _this2 = this;

		this.markers.forEach(function (marker) {
			return marker.setMap(_this2.map);
		});
	},
	initListeners: function initListeners() {
		var _this3 = this;

		google.maps.event.addListenerOnce(this.map, 'idle', function () {
			return _this3.isReady = true;
		});
		google.maps.event.addListener(this.map, 'idle', function () {
			return _this3.mapCentre = _this3.map.getCenter();
		});
		google.maps.event.addDomListener(window, 'resize', function () {
			return _this3.map.setCenter(_this3.mapCentre);
		});
	} /*,
   clearMarkers() {
            if (this.markers.length > 0) {
                this.markers.forEach(function(marker){
                    marker.setMap(null);
                });
                this.markers.length = 0;
                this.spidifier.clearMarkers(); 
            }
        }*/

};

var settings = {};
var locations = [];
var element = false;

var run = function run() {
	return delete window.$__GMAPILoaded__$;
};

var init = function init(sel, locs, opts) {
	var el = document.querySelector(sel),
	    APIPath = CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

	if (!el) throw new Error('No DOM element supplied to contain map');

	settings = Object.assign({}, defaults, opts);
	locations = locs;
	element = el;
	window.$__GMAPILoaded__$ = run;

	return Load([APIPath]).then(function () {
		return Object.assign(Object.create(StormGoogleMap), {
			settings: settings
		}).init();
	}).catch(function (e) {
		return console.log('Script loading error: ' + e.message);
	});
};

var stormGoogleMapLite = { init: init };

exports.default = stormGoogleMapLite;;
}));
