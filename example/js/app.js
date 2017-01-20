(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormGoogleMap = require('./libs/storm-google-map');

var _stormGoogleMap2 = _interopRequireDefault(_stormGoogleMap);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
	_stormGoogleMap2.default.init('#js-map', [{
		id: 'Storm',
		title: 'StormId',
		location: {
			lat: 55.9749013,
			lng: -3.1669848
		}
	}, {
		id: 'Waverley',
		title: 'Waverley Station',
		location: {
			lat: 55.9519979,
			lng: -3.1899702
		}
	}]).then(function (res) {
		console.log(res);
	});
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
},
    StormGoogleMap = {
	init: function init() {
		this.isReady = false;

		this.map = new google.maps.Map(element, this.settings.map.options);
		this.boundary = new google.maps.LatLngBounds();

		this.locations = locations;
		this.element = element;
		this.markers = this.createMarkers();

		this.spidifier = settings.modules.spidifier ? this.initSpidifier() : false;

		this.attachMarkers();

		this.markerCluster = settings.modules.clusterer ? new MarkerClusterer(this.map, this.markers, this.settings.clusterer) : false;

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
				clickable: _this.settings.modules.infobox,
				infoBoxData: marker,
				icon: {
					url: _this.settings.map.markerIcon,
					scaledSize: new google.maps.Size(24, 24)
				},
				optimized: false
			});
		});
	},
	initSpidifier: function initSpidifier() {
		var _this2 = this;

		var spidifier = new OverlappingMarkerSpiderfier(this.map, this.settings.spiderifier);
		if (this.settings.modules.infobox) spidifier.addListener('click', function (marker) {
			return _this2.clickMarker.call(marker);
		});
		return spidifier;
	},
	attachMarkers: function attachMarkers() {
		var _this3 = this;

		this.markers.forEach(function (marker) {
			marker.setMap(_this3.map);
			if (_this3.settings.modules.spidifier) _this3.spidifier.addMarker(marker);else if (_this3.settings.modules.infobox) google.maps.event.addListener(marker, 'click', _this3.clickMarker);
		});
	},
	initListeners: function initListeners() {
		var _this4 = this;

		google.maps.event.addListenerOnce(this.map, 'idle', function () {
			return _this4.isReady = true;
		});
		google.maps.event.addListener(this.map, 'idle', function () {
			return _this4.mapCentre = _this4.map.getCenter();
		});
		google.maps.event.addDomListener(window, 'resize', function () {
			return _this4.map.setCenter(_this4.mapCentre);
		});
	},
	clickMarker: function clickMarker() {
		var render = function render(template, data) {
			for (var i in data) {
				if (data.hasOwnProperty(i)) template = template.split('{{' + i + '}}').join(data[i]);
			}
			return template;
		};

		if (this.infobox) this.infobox.close(self.map, this);

		this.infobox = new InfoBox({
			content: render(settings.infobox.template, this.infoBoxData),
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

}; /**
    * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
    * @version 0.1.2: Fri, 20 Jan 2017 16:42:19 GMT
    * @author stormid
    * @license MIT
    */

var settings = {},
    locations = [],
    element = false;

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

	return (0, _stormLoad2.default)([APIPath]).then(function () {
		var dependencies = ['infobox', 'clusterer', 'spidifier'].filter(function (module) {
			return settings.modules[module] === true;
		}).map(function (module) {
			return CONSTANTS[module.toUpperCase()];
		});

		return (0, _stormLoad2.default)(dependencies).then(function () {
			return Object.assign(Object.create(StormGoogleMap), {
				settings: Object.assign({}, defaults, settings)
			}).init();
		}).catch(function (e) {
			return console.log('Script loading error: ' + e.message);
		});
	}).catch(function (e) {
		return console.log('Script loading error: ' + e.message);
	});
};

exports.default = { init: init };

},{"storm-load":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @name storm-load: Lightweight promise-based script loader
 * @version 0.3.0: Tue, 10 Jan 2017 13:35:53 GMT
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

var synchronous = exports.synchronous = function synchronous(urls) {
	if (!Array.isArray(urls)) throw new Error('Must be an array of URLs');

	return new Promise(function (resolve, reject) {
		var next = function next() {
			if (!urls.length) return resolve();
			create(urls.shift()).then(next).catch(reject);
		};
		next();
	});
};

exports.default = function (urls) {
	var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (!async) return synchronous(urls);

	if (!Array.isArray(urls)) throw new Error('Must be an array of URLs');

	return Promise.all(urls.map(function (url) {
		return create(url);
	}));
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL3N0b3JtLWdvb2dsZS1tYXAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFDdEM7MEJBQUEsQUFBVSxLQUFWLEFBQWU7TUFDZCxBQUNLLEFBQ0o7U0FGRCxBQUVRLEFBQ1A7O1FBQVcsQUFDTCxBQUNMO1FBQUssQ0FOa0IsQUFDekIsQUFHWSxBQUVKO0FBRkksQUFDVjtBQUpGLEFBQ0MsRUFGd0I7TUFTekIsQUFDSyxBQUNKO1NBRkQsQUFFUSxBQUNQOztRQUFXLEFBQ0wsQUFDTDtRQUFLLENBZFIsQUFBMEIsQUFTekIsQUFHWSxBQUVKO0FBRkksQUFDVjtBQUpGLEFBQ0MsS0FWRixBQWlCRSxLQUFLLGVBQU8sQUFDWjtVQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFuQkYsQUFvQkE7QUFyQkQsQUFBZ0MsQ0FBQTs7QUF1QmhDLElBQUcsc0JBQUgsQUFBeUIsZUFBUSxBQUFPLGlCQUFQLEFBQXdCLG9CQUFvQixZQUFNLEFBQUU7eUJBQUEsQUFBd0IsUUFBUSxVQUFBLEFBQUMsSUFBRDtTQUFBLEFBQVE7QUFBeEMsQUFBZ0Q7QUFBcEcsQ0FBQTs7Ozs7Ozs7O0FDbkJqQzs7Ozs7Ozs7QUFFQSxJQUFNO1FBQVksQUFDVCxBQUNQO1VBRmdCLEFBRVAsQUFDVDtZQUhnQixBQUdMLEFBQ1g7WUFKRixBQUFrQixBQUlMO0FBSkssQUFDaEI7SUFLRDtNQUFXLEFBQ0wsQUFDTDs7V0FBUyxBQUNDLEFBQ1Q7YUFGUSxBQUVHLEFBQ1g7YUFMUyxBQUVELEFBR0csQUFFWjtBQUxTLEFBQ1I7OztpQkFLVSxBQUNLLEFBQ2Q7Z0JBRlMsQUFFSSxBQUNiO21CQUhTLEFBR08s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QW9CLFVBQTVDLEVBQXdEO0FBQ3hELEdBRkQ7QUFHQSxJQUFFLE9BQUYsR0FBWSxFQUFFLE9BQUYsR0FBWSxNQUF4QjtBQUNBLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUI7QUFDQSxFQVJNLENBQVA7QUFTQSxDQVZEOztBQVlPLElBQU0sb0NBQWMsU0FBZCxXQUFjLE9BQVE7QUFDbEMsS0FBRyxDQUFDLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBSixFQUF5QixNQUFNLElBQUksS0FBSixDQUFVLDBCQUFWLENBQU47O0FBRXpCLFFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN2QyxNQUFJLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDaEIsT0FBSSxDQUFDLEtBQUssTUFBVixFQUFrQixPQUFPLFNBQVA7QUFDbEIsVUFBTyxLQUFLLEtBQUwsRUFBUCxFQUFxQixJQUFyQixDQUEwQixJQUExQixFQUFnQyxLQUFoQyxDQUFzQyxNQUF0QztBQUNBLEdBSEQ7QUFJQTtBQUNBLEVBTk0sQ0FBUDtBQU9BLENBVk07O2tCQVlRLFVBQUMsSUFBRCxFQUF3QjtBQUFBLEtBQWpCLEtBQWlCLHVFQUFULElBQVM7O0FBQ3RDLEtBQUksQ0FBQyxLQUFMLEVBQVksT0FBTyxZQUFZLElBQVosQ0FBUDs7QUFFWixLQUFHLENBQUMsTUFBTSxPQUFOLENBQWMsSUFBZCxDQUFKLEVBQXlCLE1BQU0sSUFBSSxLQUFKLENBQVUsMEJBQVYsQ0FBTjs7QUFFekIsUUFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFLLEdBQUwsQ0FBUztBQUFBLFNBQU8sT0FBTyxHQUFQLENBQVA7QUFBQSxFQUFULENBQVosQ0FBUDtBQUNBLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEdvb2dsZU1hcCBmcm9tICcuL2xpYnMvc3Rvcm0tZ29vZ2xlLW1hcCc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcblx0R29vZ2xlTWFwLmluaXQoJyNqcy1tYXAnLCBbXG5cdFx0e1xuXHRcdFx0aWQ6ICdTdG9ybScsXG5cdFx0XHR0aXRsZTogJ1N0b3JtSWQnLFxuXHRcdFx0bG9jYXRpb24gOiB7IFxuXHRcdFx0XHRsYXQ6IDU1Ljk3NDkwMTMsXG5cdFx0XHRcdGxuZzogLTMuMTY2OTg0OFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQ6ICdXYXZlcmxleScsXG5cdFx0XHR0aXRsZTogJ1dhdmVybGV5IFN0YXRpb24nLFxuXHRcdFx0bG9jYXRpb24gOiB7XG5cdFx0XHRcdGxhdDogNTUuOTUxOTk3OSxcblx0XHRcdFx0bG5nOiAtMy4xODk5NzAyXG5cdFx0XHR9XG5cdFx0fV0pXG5cdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0fSk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tZ29vZ2xlLW1hcDogR29vZ2xlIE1hcHMgQVBJIGxvYWRlciBhbmQgYWJzdHJhY3Rpb24gbGF5ZXIgd2l0aCBzcGlkZXJpbmcsIGNsdXN0ZXJpbmcgYW5kIGluZm9ib3hcbiAqIEB2ZXJzaW9uIDAuMS4yOiBGcmksIDIwIEphbiAyMDE3IDE2OjQyOjE5IEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuaW1wb3J0IExvYWQgZnJvbSAnc3Rvcm0tbG9hZCc7XG5cbmNvbnN0IENPTlNUQU5UUyA9IHtcblx0XHRHTUFQSTogJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2NhbGxiYWNrPSRfX0dNQVBJTG9hZGVkX18kJyxcblx0XHRJTkZPQk9YOiAnaHR0cHM6Ly9jZG4ucmF3Z2l0LmNvbS9nb29nbGVtYXBzL3YzLXV0aWxpdHktbGlicmFyeS9hMmNkYzk1NWZjZDIwZDQ3ZGIyOGRiNjQ1ZTYzZjBkMjA1NDA3MGM5LzEuMS45L3NyYy9pbmZvYm94X3BhY2tlZC5qcycsXG5cdFx0Q0xVU1RFUkVSOiAnaHR0cHM6Ly9jZG4ucmF3Z2l0LmNvbS9nb29nbGVtYXBzL3YzLXV0aWxpdHktbGlicmFyeS9kZjUwMWZjYmMzZTc1MTNkNmE5NDcxOGFiNjY3M2RlNDdjMjAyMjU1LzEuMC4yL3NyYy9tYXJrZXJjbHVzdGVyZXJfY29tcGlsZWQuanMnLFxuXHRcdFNQSURJRklFUjogJ2h0dHBzOi8vamF3ai5naXRodWIuaW8vT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyL2Jpbi9vbXMubWluLmpzJ1xuXHR9LFxuXHRkZWZhdWx0cyA9IHtcblx0XHRrZXk6IG51bGwsXG5cdFx0bW9kdWxlczoge1xuXHRcdFx0aW5mb2JveDogdHJ1ZSxcblx0XHRcdGNsdXN0ZXJlcjogdHJ1ZSxcblx0XHRcdHNwaWRpZmllcjogdHJ1ZVxuXHRcdH0sXG5cdFx0bWFwIDoge1xuXHRcdFx0b3B0aW9ucyA6IHtcblx0XHRcdFx0c2NhbGVDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlLFxuXHRcdFx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXG5cdFx0XHRcdG92ZXJ2aWV3TWFwQ29udHJvbDogdHJ1ZSxcblx0XHRcdFx0cGFuQ29udHJvbDogZmFsc2UsXG5cdFx0XHRcdHJvdGF0ZUNvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcblx0XHRcdFx0bWF4Wm9vbTogMTYsXG5cdFx0XHRcdHpvb21Db250cm9sOiB0cnVlLFxuXHRcdFx0XHRzdHlsZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgIHtzdHlsZXJzOiBbe3Zpc2liaWxpdHk6ICdvbid9LCB7c2F0dXJhdGlvbjogLTEwMCwgaHVlOiAnIzAwMDAwMCcgfV19LFxuICAgICAgICAgICAgICAgICAgICB7ZmVhdHVyZVR5cGU6ICdyb2FkLmxvY2FsJywgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogJ3NpbXBsaWZpZWQnIH1dfSxcbiAgICAgICAgICAgICAgICAgICAge2ZlYXR1cmVUeXBlOiAncG9pJywgZWxlbWVudFR5cGU6ICdsYWJlbHMnLCBzdHlsZXJzOiBbeyB2aXNpYmlsaXR5OiAnb2ZmJyB9XX0sXG4gICAgICAgICAgICAgICAgICAgIHtmZWF0dXJlVHlwZTogJ2xhbmRzY2FwZS5tYW5fbWFkZScsIHN0eWxlcnM6IFt7IHZpc2liaWxpdHk6ICdvbicgfV19LFxuICAgICAgICAgICAgICAgICAgICB7ZmVhdHVyZVR5cGU6ICd0cmFuc2l0Jywgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogJ29uJyB9XX1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdG1hcmtlckljb24gOiAnZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVMtQVNDSUksJTNDc3ZnJTIwZmlsbCUzRCUyMiUyMzAwMDAwMCUyMiUyMGhlaWdodCUzRCUyMjI0JTIyJTIwdmlld0JveCUzRCUyMjAlMjAwJTIwMjQlMjAyNCUyMiUyMHdpZHRoJTNEJTIyMjQlMjIlMjB4bWxucyUzRCUyMmh0dHAlM0EvL3d3dy53My5vcmcvMjAwMC9zdmclMjIlM0UlMEElMjAlMjAlMjAlMjAlM0NwYXRoJTIwZCUzRCUyMk0xMiUyMDJDOC4xMyUyMDIlMjA1JTIwNS4xMyUyMDUlMjA5YzAlMjA1LjI1JTIwNyUyMDEzJTIwNyUyMDEzczctNy43NSUyMDctMTNjMC0zLjg3LTMuMTMtNy03LTd6bTAlMjA5LjVjLTEuMzglMjAwLTIuNS0xLjEyLTIuNS0yLjVzMS4xMi0yLjUlMjAyLjUtMi41JTIwMi41JTIwMS4xMiUyMDIuNSUyMDIuNS0xLjEyJTIwMi41LTIuNSUyMDIuNXolMjIvJTNFJTBBJTIwJTIwJTIwJTIwJTNDcGF0aCUyMGQlM0QlMjJNMCUyMDBoMjR2MjRIMHolMjIlMjBmaWxsJTNEJTIybm9uZSUyMi8lM0UlMEElM0Mvc3ZnJTNFJ1xuXHRcdH0sXG5cdFx0c3BpZGVyaWZpZXIgOiB7XG5cdFx0XHRrZWVwU3BpZGVyZmllZDogdHJ1ZSxcblx0XHRcdG1hcmtlcnNXb250TW92ZTogdHJ1ZSxcblx0XHRcdG1hcmtlcnNXb250SGlkZTogdHJ1ZVxuXHRcdH0sXG5cdFx0Y2x1c3RlcmVyIDoge1xuXHRcdFx0bWF4Wm9vbTogMTIsXG5cdFx0XHRncmlkU2l6ZTogMjBcblx0XHR9LFxuXHRcdGluZm9ib3g6IHtcblx0XHRcdHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImluZm9ib3hcIj48ZGl2IGNsYXNzPVwiaW5mb2JveC1pbm5lclwiIGlkPVwiaW5mb2JveFwiPjxoMSBjbGFzcz1cImluZm9ib3gtaGVhZGluZ1wiPnt7dGl0bGV9fTwvaDE+PC9kaXY+PC9kaXY+Jyxcblx0XHRcdGNsb3NlSWNvbiA6ICdkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD1VUy1BU0NJSSwlM0NzdmclMjBmaWxsJTNEJTIyJTIzRkZGRkZGJTIyJTIwaGVpZ2h0JTNEJTIyMTglMjIlMjB2aWV3Qm94JTNEJTIyMCUyMDAlMjAyNCUyMDI0JTIyJTIwd2lkdGglM0QlMjIxOCUyMiUyMHhtbG5zJTNEJTIyaHR0cCUzQS8vd3d3LnczLm9yZy8yMDAwL3N2ZyUyMiUzRSUwQSUyMCUyMCUyMCUyMCUzQ3BhdGglMjBkJTNEJTIyTTE5JTIwNi40MUwxNy41OSUyMDUlMjAxMiUyMDEwLjU5JTIwNi40MSUyMDUlMjA1JTIwNi40MSUyMDEwLjU5JTIwMTIlMjA1JTIwMTcuNTklMjA2LjQxJTIwMTklMjAxMiUyMDEzLjQxJTIwMTcuNTklMjAxOSUyMDE5JTIwMTcuNTklMjAxMy40MSUyMDEyeiUyMi8lM0UlMEElMjAlMjAlMjAlMjAlM0NwYXRoJTIwZCUzRCUyMk0wJTIwMGgyNHYyNEgweiUyMiUyMGZpbGwlM0QlMjJub25lJTIyLyUzRSUwQSUzQy9zdmclM0UnLFxuXHRcdFx0dXJsQmFzZTogJy8nLFxuXHRcdFx0Ym94U3R5bGU6IHtcblx0XHRcdFx0d2lkdGg6JzI1MHB4Jyxcblx0XHRcdFx0b3BhY2l0eTogMVxuXHRcdFx0fSxcblx0XHRcdHBpeGVsT2Zmc2V0OiBbLTExNSwgLTEwXVxuXHRcdH1cblx0fSxcblx0U3Rvcm1Hb29nbGVNYXAgPSB7XG5cdFx0aW5pdCgpe1xuXHRcdFx0dGhpcy5pc1JlYWR5ID0gZmFsc2U7XG5cblx0XHRcdHRoaXMubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChlbGVtZW50LCB0aGlzLnNldHRpbmdzLm1hcC5vcHRpb25zKTtcblx0XHRcdHRoaXMuYm91bmRhcnkgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzKCk7XG5cblx0XHRcdHRoaXMubG9jYXRpb25zID0gbG9jYXRpb25zO1xuXHRcdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblx0XHRcdHRoaXMubWFya2VycyA9IHRoaXMuY3JlYXRlTWFya2VycygpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLnNwaWRpZmllciA9IHNldHRpbmdzLm1vZHVsZXMuc3BpZGlmaWVyID8gdGhpcy5pbml0U3BpZGlmaWVyKCkgOiBmYWxzZTtcblx0XHRcdFxuXHRcdFx0dGhpcy5hdHRhY2hNYXJrZXJzKCk7XG5cblx0XHRcdHRoaXMubWFya2VyQ2x1c3RlciA9IHNldHRpbmdzLm1vZHVsZXMuY2x1c3RlcmVyID8gbmV3IE1hcmtlckNsdXN0ZXJlcih0aGlzLm1hcCwgdGhpcy5tYXJrZXJzLCB0aGlzLnNldHRpbmdzLmNsdXN0ZXJlcikgOiBmYWxzZTtcblx0XHRcdFxuXHRcdFx0dGhpcy5tYXAuZml0Qm91bmRzKHRoaXMuYm91bmRhcnkpO1xuXG5cdFx0XHR0aGlzLmluaXRMaXN0ZW5lcnMoKTtcblx0XHRcdFxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRjcmVhdGVNYXJrZXJzKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5sb2NhdGlvbnMubWFwKG1hcmtlciA9PiB7XG5cdFx0XHRcdGxldCBsYXRMbmcgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKG1hcmtlci5sb2NhdGlvbi5sYXQsIG1hcmtlci5sb2NhdGlvbi5sbmcpO1xuXG5cdFx0XHRcdHRoaXMuYm91bmRhcnkuZXh0ZW5kKGxhdExuZyk7XG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XG5cdFx0XHRcdFx0cG9zaXRpb246IGxhdExuZyxcblx0XHRcdFx0XHRjbGlja2FibGU6IHRoaXMuc2V0dGluZ3MubW9kdWxlcy5pbmZvYm94LFxuXHRcdFx0XHRcdGluZm9Cb3hEYXRhIDogbWFya2VyLFxuXHRcdFx0XHRcdGljb246IHtcblx0XHRcdFx0XHRcdHVybDogdGhpcy5zZXR0aW5ncy5tYXAubWFya2VySWNvbixcblx0XHRcdFx0XHRcdHNjYWxlZFNpemU6IG5ldyBnb29nbGUubWFwcy5TaXplKDI0LDI0KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0b3B0aW1pemVkOiBmYWxzZSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcbiAgICAgICAgICAgIFxuXHRcdH0sXG5cdFx0aW5pdFNwaWRpZmllcigpIHtcblx0XHRcdGxldCBzcGlkaWZpZXIgPSBuZXcgT3ZlcmxhcHBpbmdNYXJrZXJTcGlkZXJmaWVyKHRoaXMubWFwLCB0aGlzLnNldHRpbmdzLnNwaWRlcmlmaWVyKTtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MubW9kdWxlcy5pbmZvYm94KSBzcGlkaWZpZXIuYWRkTGlzdGVuZXIoJ2NsaWNrJywgbWFya2VyID0+IHRoaXMuY2xpY2tNYXJrZXIuY2FsbChtYXJrZXIpKTtcblx0XHRcdHJldHVybiBzcGlkaWZpZXI7XG5cdFx0fSxcblx0XHRhdHRhY2hNYXJrZXJzKCkge1xuXHRcdFx0dGhpcy5tYXJrZXJzLmZvckVhY2gobWFya2VyID0+IHtcblx0XHRcdFx0bWFya2VyLnNldE1hcCh0aGlzLm1hcCk7XG5cdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MubW9kdWxlcy5zcGlkaWZpZXIpIHRoaXMuc3BpZGlmaWVyLmFkZE1hcmtlcihtYXJrZXIpO1xuXHRcdFx0XHRlbHNlIGlmKHRoaXMuc2V0dGluZ3MubW9kdWxlcy5pbmZvYm94KSBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIHRoaXMuY2xpY2tNYXJrZXIpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHRpbml0TGlzdGVuZXJzKCl7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lck9uY2UodGhpcy5tYXAsICdpZGxlJywgKCkgPT4gdGhpcy5pc1JlYWR5ID0gdHJ1ZSk7XG5cdFx0XHRnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcih0aGlzLm1hcCwgJ2lkbGUnLCAoKSA9PiB0aGlzLm1hcENlbnRyZSA9IHRoaXMubWFwLmdldENlbnRlcigpKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsICgpID0+IHRoaXMubWFwLnNldENlbnRlcih0aGlzLm1hcENlbnRyZSkpO1xuXHRcdH0sXG5cdFx0Y2xpY2tNYXJrZXIoKSB7XG5cdFx0XHRsZXQgcmVuZGVyID0gKHRlbXBsYXRlLCBkYXRhKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGkgaW4gZGF0YSl7XG5cdFx0XHRcdFx0aWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaSkpIHRlbXBsYXRlID0gdGVtcGxhdGUuc3BsaXQoJ3t7JyArIGkgKyAnfX0nKS5qb2luKGRhdGFbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0ZW1wbGF0ZTtcblx0XHRcdH07XG4gICAgICAgICAgICBcblx0XHRcdGlmICh0aGlzLmluZm9ib3gpIHRoaXMuaW5mb2JveC5jbG9zZShzZWxmLm1hcCwgdGhpcyk7XG5cdFx0XHRcblx0XHRcdHRoaXMuaW5mb2JveCA9IG5ldyBJbmZvQm94KHtcblx0XHRcdFx0Y29udGVudDogcmVuZGVyKHNldHRpbmdzLmluZm9ib3gudGVtcGxhdGUsIHRoaXMuaW5mb0JveERhdGEpLFxuXHRcdFx0XHRkaXNhYmxlQXV0b1BhbjogZmFsc2UsXG5cdFx0XHRcdHpJbmRleDogbnVsbCxcblx0XHRcdFx0bWF4V2lkdGg6IDAsXG5cdFx0XHRcdGJveFN0eWxlOiBzZXR0aW5ncy5pbmZvYm94LmJveFN0eWxlLFxuXHRcdFx0XHRwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoc2V0dGluZ3MuaW5mb2JveC5waXhlbE9mZnNldFswXSwgc2V0dGluZ3MuaW5mb2JveC5waXhlbE9mZnNldFsxXSksXG5cdFx0XHRcdGFsaWduQm90dG9tOiB0cnVlLFxuXHRcdFx0XHRjbG9zZUJveE1hcmdpbjogJzRweCA0cHggNHB4IDRweCcsXG5cdFx0XHRcdGlzSGlkZGVuOiBmYWxzZSxcblx0XHRcdFx0Y2xvc2VCb3hVUkw6IHNldHRpbmdzLmluZm9ib3guY2xvc2VJY29uLFxuXHRcdFx0XHRpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcblx0XHRcdFx0cGFuZTogJ2Zsb2F0UGFuZScsXG5cdFx0XHRcdGVuYWJsZUV2ZW50UHJvcGFnYXRpb246IGZhbHNlXG5cdFx0XHR9KTtcblx0XHRcdHRoaXMuaW5mb2JveC5vcGVuKHRoaXMubWFwLCB0aGlzKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7dGhpcy5pbmZvYm94LmNsb3NlKHRoaXMubWFwKTsgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgXG5cdFx0fS8qLFxuXHRcdGNsZWFyTWFya2VycygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlcil7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGlkaWZpZXIuY2xlYXJNYXJrZXJzKCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9Ki9cblx0fTtcblxubGV0IHNldHRpbmdzID0ge30sXG5cdGxvY2F0aW9ucyA9IFtdLFxuXHRlbGVtZW50ID0gZmFsc2U7XG5cbmNvbnN0IHJ1biA9ICgpID0+IGRlbGV0ZSB3aW5kb3cuJF9fR01BUElMb2FkZWRfXyQ7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBsb2NzLCBvcHRzKSA9PiB7XG5cdGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSxcblx0XHRBUElQYXRoID0gQ09OU1RBTlRTLkdNQVBJICsgKCFvcHRzIHx8ICFvcHRzLmtleSA/ICcnIDogJyZrZXk9JyArIG9wdHMua2V5KTtcblxuXHRpZighZWwpIHRocm93IG5ldyBFcnJvcignTm8gRE9NIGVsZW1lbnQgc3VwcGxpZWQgdG8gY29udGFpbiBtYXAnKTtcbiAgICBcblx0c2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cyk7XG5cdGxvY2F0aW9ucyA9IGxvY3M7XG5cdGVsZW1lbnQgPSBlbDtcblx0d2luZG93LiRfX0dNQVBJTG9hZGVkX18kID0gcnVuO1xuXHRcblx0cmV0dXJuIExvYWQoW0FQSVBhdGhdKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdGxldCBkZXBlbmRlbmNpZXMgPSBbJ2luZm9ib3gnLCAnY2x1c3RlcmVyJywgJ3NwaWRpZmllciddLmZpbHRlcihtb2R1bGUgPT4gc2V0dGluZ3MubW9kdWxlc1ttb2R1bGVdID09PSB0cnVlKS5tYXAobW9kdWxlID0+IENPTlNUQU5UU1ttb2R1bGUudG9VcHBlckNhc2UoKV0pO1xuXHRcdFx0XHRcblx0XHRcdHJldHVybiBMb2FkKGRlcGVuZGVuY2llcylcblx0XHRcdFx0LnRoZW4oKCkgPT4geyBcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKFN0b3JtR29vZ2xlTWFwKSwge1xuXHRcdFx0XHRcdFx0c2V0dGluZ3M6IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBzZXR0aW5ncylcblx0XHRcdFx0XHR9KS5pbml0KCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaCgoZSkgPT4gY29uc29sZS5sb2coYFNjcmlwdCBsb2FkaW5nIGVycm9yOiAke2UubWVzc2FnZX1gKSk7XG5cdFx0fSlcblx0LmNhdGNoKGUgPT4gY29uc29sZS5sb2coYFNjcmlwdCBsb2FkaW5nIGVycm9yOiAke2UubWVzc2FnZX1gKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCIvKipcbiAqIEBuYW1lIHN0b3JtLWxvYWQ6IExpZ2h0d2VpZ2h0IHByb21pc2UtYmFzZWQgc2NyaXB0IGxvYWRlclxuICogQHZlcnNpb24gMC4zLjA6IFR1ZSwgMTAgSmFuIDIwMTcgMTM6MzU6NTMgR01UXG4gKiBAYXV0aG9yIHN0b3JtaWRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5jb25zdCBjcmVhdGUgPSB1cmwgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0cy5zcmMgPSB1cmw7XG5cdFx0cy5vbmxvYWQgPSBzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSByZXNvbHZlKCk7XG5cdFx0fTtcblx0XHRzLm9uZXJyb3IgPSBzLm9uYWJvcnQgPSByZWplY3Q7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3luY2hyb25vdXMgPSB1cmxzID0+IHtcblx0aWYoIUFycmF5LmlzQXJyYXkodXJscykpIHRocm93IG5ldyBFcnJvcignTXVzdCBiZSBhbiBhcnJheSBvZiBVUkxzJyk7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgbmV4dCA9ICgpID0+IHtcblx0XHRcdGlmICghdXJscy5sZW5ndGgpIHJldHVybiByZXNvbHZlKCk7XG5cdFx0XHRjcmVhdGUodXJscy5zaGlmdCgpKS50aGVuKG5leHQpLmNhdGNoKHJlamVjdCk7XG5cdFx0fTtcblx0XHRuZXh0KCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHVybHMsIGFzeW5jID0gdHJ1ZSkgPT4ge1xuXHRpZiAoIWFzeW5jKSByZXR1cm4gc3luY2hyb25vdXModXJscyk7XG5cdFxuXHRpZighQXJyYXkuaXNBcnJheSh1cmxzKSkgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGJlIGFuIGFycmF5IG9mIFVSTHMnKTsgXG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHVybHMubWFwKHVybCA9PiBjcmVhdGUodXJsKSkpO1xufTsiXX0=
