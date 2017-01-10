(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormGoogleMapLite = require('./libs/storm-google-map-lite');

var _stormGoogleMapLite2 = _interopRequireDefault(_stormGoogleMapLite);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {
	_stormGoogleMapLite2.default.init('#js-map', [{
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

},{"./libs/storm-google-map-lite":2}],2:[function(require,module,exports){
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
	GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$'
},
    defaults = {
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
},
    StormGoogleMap = {
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

}; /**
    * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
    * @version 0.1.2: Tue, 10 Jan 2017 15:17:48 GMT
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
		return Object.assign(Object.create(StormGoogleMap), {
			settings: settings
		}).init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJleGFtcGxlL3NyYy9saWJzL3N0b3JtLWdvb2dsZS1tYXAtbGl0ZS5qcyIsIm5vZGVfbW9kdWxlcy9zdG9ybS1sb2FkL2Rpc3Qvc3Rvcm0tbG9hZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7Ozs7O0FBRUEsSUFBTSwyQkFBMkIsWUFBTSxBQUN0Qzs4QkFBQSxBQUFVLEtBQVYsQUFBZTtNQUNkLEFBQ0ssQUFDSjtTQUZELEFBRVEsQUFDUDs7UUFBVyxBQUNMLEFBQ0w7UUFBSyxDQU5rQixBQUN6QixBQUdZLEFBRUo7QUFGSSxBQUNWO0FBSkYsQUFDQyxFQUZ3QjtNQVN6QixBQUNLLEFBQ0o7U0FGRCxBQUVRLEFBQ1A7O1FBQVcsQUFDTCxBQUNMO1FBQUssQ0FkUixBQUEwQixBQVN6QixBQUdZLEFBRUo7QUFGSSxBQUNWO0FBSkYsQUFDQyxLQVZGLEFBaUJFLEtBQUssZUFBTyxBQUNaO1VBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQW5CRixBQW9CQTtBQXJCRCxBQUFnQyxDQUFBOztBQXVCaEMsSUFBRyxzQkFBSCxBQUF5QixlQUFRLEFBQU8saUJBQVAsQUFBd0Isb0JBQW9CLFlBQU0sQUFBRTt5QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO1NBQUEsQUFBUTtBQUF4QyxBQUFnRDtBQUFwRyxDQUFBOzs7Ozs7Ozs7QUNuQmpDOzs7Ozs7OztBQUVBLElBQU07UUFBTixBQUFrQixBQUNUO0FBRFMsQUFDaEI7SUFFRDtNQUFXLEFBQ0wsQUFDTDs7O2lCQUNXLEFBQ0ssQUFDZDtnQkFGUyxBQUVJLEFBQ2I7bUJBSFMsQUFHTyxBQUNoQjt1QkFKUyxBQUlXLEFBQ3BCO2VBTFMsQUFLRyxBQUNaO2tCQU5TLEFBTU0sQUFDZjtzQkFQUyxBQU9VLEFBQ25CO1lBUlMsQUFRQSxBQUNUO2dCQVRTLEFBU0ksQUFDYjtX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QUFaLENBQVA7O0FBRVosS0FBRyxDQUFDLE1BQU0sT0FBTixDQUFjLElBQWQsQ0FBSixFQUF5QixNQUFNLElBQUksS0FBSixDQUFVLDBCQUFWLENBQU47O0FBRXpCLFFBQU8sUUFBUSxHQUFSLENBQVksS0FBSyxHQUFMLENBQVM7QUFBQSxTQUFPLE9BQU8sR0FBUCxDQUFQO0FBQUEsRUFBVCxDQUFaLENBQVA7QUFDQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBHb29nbGVNYXAgZnJvbSAnLi9saWJzL3N0b3JtLWdvb2dsZS1tYXAtbGl0ZSc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcblx0R29vZ2xlTWFwLmluaXQoJyNqcy1tYXAnLCBbXG5cdFx0e1xuXHRcdFx0aWQ6ICdTdG9ybScsXG5cdFx0XHR0aXRsZTogJ1N0b3JtSWQnLFxuXHRcdFx0bG9jYXRpb24gOiB7IFxuXHRcdFx0XHRsYXQ6IDU1Ljk3NDkwMTMsXG5cdFx0XHRcdGxuZzogLTMuMTY2OTg0OFxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQ6ICdXYXZlcmxleScsXG5cdFx0XHR0aXRsZTogJ1dhdmVybGV5IFN0YXRpb24nLFxuXHRcdFx0bG9jYXRpb24gOiB7XG5cdFx0XHRcdGxhdDogNTUuOTUxOTk3OSxcblx0XHRcdFx0bG5nOiAtMy4xODk5NzAyXG5cdFx0XHR9XG5cdFx0fV0pXG5cdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0fSk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tZ29vZ2xlLW1hcDogR29vZ2xlIE1hcHMgQVBJIGxvYWRlciBhbmQgYWJzdHJhY3Rpb24gbGF5ZXIgd2l0aCBzcGlkZXJpbmcsIGNsdXN0ZXJpbmcgYW5kIGluZm9ib3hcbiAqIEB2ZXJzaW9uIDAuMS4yOiBUdWUsIDEwIEphbiAyMDE3IDE1OjE3OjQ4IEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuaW1wb3J0IExvYWQgZnJvbSAnc3Rvcm0tbG9hZCc7XG5cbmNvbnN0IENPTlNUQU5UUyA9IHtcblx0XHRHTUFQSTogJ2h0dHA6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2NhbGxiYWNrPSRfX0dNQVBJTG9hZGVkX18kJ1xuXHR9LFxuXHRkZWZhdWx0cyA9IHtcblx0XHRrZXk6IG51bGwsXG5cdFx0bWFwIDoge1xuXHRcdFx0b3B0aW9ucyA6IHtcblx0XHRcdFx0c2NhbGVDb250cm9sOiBmYWxzZSxcblx0XHRcdFx0c2Nyb2xsd2hlZWw6IGZhbHNlLFxuXHRcdFx0XHRtYXBUeXBlQ29udHJvbDogZmFsc2UsXG5cdFx0XHRcdG92ZXJ2aWV3TWFwQ29udHJvbDogdHJ1ZSxcblx0XHRcdFx0cGFuQ29udHJvbDogZmFsc2UsXG5cdFx0XHRcdHJvdGF0ZUNvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRzdHJlZXRWaWV3Q29udHJvbDogdHJ1ZSxcblx0XHRcdFx0bWF4Wm9vbTogMTYsXG5cdFx0XHRcdHpvb21Db250cm9sOiB0cnVlLFxuXHRcdFx0XHRzdHlsZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgIHtzdHlsZXJzOiBbe3Zpc2liaWxpdHk6ICdvbid9LCB7c2F0dXJhdGlvbjogLTEwMCwgaHVlOiAnIzAwMDAwMCcgfV19LFxuICAgICAgICAgICAgICAgICAgICB7ZmVhdHVyZVR5cGU6ICdyb2FkLmxvY2FsJywgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogJ3NpbXBsaWZpZWQnIH1dfSxcbiAgICAgICAgICAgICAgICAgICAge2ZlYXR1cmVUeXBlOiAncG9pJywgZWxlbWVudFR5cGU6ICdsYWJlbHMnLCBzdHlsZXJzOiBbeyB2aXNpYmlsaXR5OiAnb2ZmJyB9XX0sXG4gICAgICAgICAgICAgICAgICAgIHtmZWF0dXJlVHlwZTogJ2xhbmRzY2FwZS5tYW5fbWFkZScsIHN0eWxlcnM6IFt7IHZpc2liaWxpdHk6ICdvbicgfV19LFxuICAgICAgICAgICAgICAgICAgICB7ZmVhdHVyZVR5cGU6ICd0cmFuc2l0Jywgc3R5bGVyczogW3sgdmlzaWJpbGl0eTogJ29uJyB9XX1cblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdG1hcmtlckljb24gOiAnZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9VVMtQVNDSUksJTNDc3ZnJTIwZmlsbCUzRCUyMiUyMzAwMDAwMCUyMiUyMGhlaWdodCUzRCUyMjI0JTIyJTIwdmlld0JveCUzRCUyMjAlMjAwJTIwMjQlMjAyNCUyMiUyMHdpZHRoJTNEJTIyMjQlMjIlMjB4bWxucyUzRCUyMmh0dHAlM0EvL3d3dy53My5vcmcvMjAwMC9zdmclMjIlM0UlMEElMjAlMjAlMjAlMjAlM0NwYXRoJTIwZCUzRCUyMk0xMiUyMDJDOC4xMyUyMDIlMjA1JTIwNS4xMyUyMDUlMjA5YzAlMjA1LjI1JTIwNyUyMDEzJTIwNyUyMDEzczctNy43NSUyMDctMTNjMC0zLjg3LTMuMTMtNy03LTd6bTAlMjA5LjVjLTEuMzglMjAwLTIuNS0xLjEyLTIuNS0yLjVzMS4xMi0yLjUlMjAyLjUtMi41JTIwMi41JTIwMS4xMiUyMDIuNSUyMDIuNS0xLjEyJTIwMi41LTIuNSUyMDIuNXolMjIvJTNFJTBBJTIwJTIwJTIwJTIwJTNDcGF0aCUyMGQlM0QlMjJNMCUyMDBoMjR2MjRIMHolMjIlMjBmaWxsJTNEJTIybm9uZSUyMi8lM0UlMEElM0Mvc3ZnJTNFJ1xuXHRcdH0sXG5cdFx0aW5mb2JveDoge1xuXHRcdFx0dGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiaW5mb2JveFwiPjxkaXYgY2xhc3M9XCJpbmZvYm94LWlubmVyXCIgaWQ9XCJpbmZvYm94XCI+PGgxIGNsYXNzPVwiaW5mb2JveC1oZWFkaW5nXCI+e3t0aXRsZX19PC9oMT48L2Rpdj48L2Rpdj4nLFxuXHRcdFx0Y2xvc2VJY29uIDogJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PVVTLUFTQ0lJLCUzQ3N2ZyUyMGZpbGwlM0QlMjIlMjNGRkZGRkYlMjIlMjBoZWlnaHQlM0QlMjIxOCUyMiUyMHZpZXdCb3glM0QlMjIwJTIwMCUyMDI0JTIwMjQlMjIlMjB3aWR0aCUzRCUyMjE4JTIyJTIweG1sbnMlM0QlMjJodHRwJTNBLy93d3cudzMub3JnLzIwMDAvc3ZnJTIyJTNFJTBBJTIwJTIwJTIwJTIwJTNDcGF0aCUyMGQlM0QlMjJNMTklMjA2LjQxTDE3LjU5JTIwNSUyMDEyJTIwMTAuNTklMjA2LjQxJTIwNSUyMDUlMjA2LjQxJTIwMTAuNTklMjAxMiUyMDUlMjAxNy41OSUyMDYuNDElMjAxOSUyMDEyJTIwMTMuNDElMjAxNy41OSUyMDE5JTIwMTklMjAxNy41OSUyMDEzLjQxJTIwMTJ6JTIyLyUzRSUwQSUyMCUyMCUyMCUyMCUzQ3BhdGglMjBkJTNEJTIyTTAlMjAwaDI0djI0SDB6JTIyJTIwZmlsbCUzRCUyMm5vbmUlMjIvJTNFJTBBJTNDL3N2ZyUzRScsXG5cdFx0XHR1cmxCYXNlOiAnLycsXG5cdFx0XHRib3hTdHlsZToge1xuXHRcdFx0XHR3aWR0aDonMjUwcHgnLFxuXHRcdFx0XHRvcGFjaXR5OiAxXG5cdFx0XHR9LFxuXHRcdFx0cGl4ZWxPZmZzZXQ6IFstMTE1LCAtMTBdXG5cdFx0fVxuXHR9LFxuXHRTdG9ybUdvb2dsZU1hcCA9IHtcblx0XHRpbml0KCl7XG5cdFx0XHR0aGlzLmlzUmVhZHkgPSBmYWxzZTtcblxuXHRcdFx0dGhpcy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGVsZW1lbnQsIHRoaXMuc2V0dGluZ3MubWFwLm9wdGlvbnMpO1xuXHRcdFx0dGhpcy5ib3VuZGFyeSA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHMoKTtcblxuXHRcdFx0dGhpcy5sb2NhdGlvbnMgPSBsb2NhdGlvbnM7XG5cdFx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXHRcdFx0dGhpcy5tYXJrZXJzID0gdGhpcy5jcmVhdGVNYXJrZXJzKCk7XG5cdFx0XHRcblx0XHRcdHRoaXMuYXR0YWNoTWFya2VycygpO1xuXHRcdFx0XG5cdFx0XHR0aGlzLm1hcC5maXRCb3VuZHModGhpcy5ib3VuZGFyeSk7XG5cblx0XHRcdHRoaXMuaW5pdExpc3RlbmVycygpO1xuXHRcdFx0XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGNyZWF0ZU1hcmtlcnMoKXtcblx0XHRcdHJldHVybiB0aGlzLmxvY2F0aW9ucy5tYXAobWFya2VyID0+IHtcblx0XHRcdFx0bGV0IGxhdExuZyA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobWFya2VyLmxvY2F0aW9uLmxhdCwgbWFya2VyLmxvY2F0aW9uLmxuZyk7XG5cblx0XHRcdFx0dGhpcy5ib3VuZGFyeS5leHRlbmQobGF0TG5nKTtcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcblx0XHRcdFx0XHRwb3NpdGlvbjogbGF0TG5nLFxuXHRcdFx0XHRcdGNsaWNrYWJsZTogZmFsc2UsXG5cdFx0XHRcdFx0aWNvbjoge1xuXHRcdFx0XHRcdFx0dXJsOiB0aGlzLnNldHRpbmdzLm1hcC5tYXJrZXJJY29uLFxuXHRcdFx0XHRcdFx0c2NhbGVkU2l6ZTogbmV3IGdvb2dsZS5tYXBzLlNpemUoMjQsMjQpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRvcHRpbWl6ZWQ6IGZhbHNlLFxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuICAgICAgICAgICAgXG5cdFx0fSxcblx0XHRhdHRhY2hNYXJrZXJzKCkge1xuXHRcdFx0dGhpcy5tYXJrZXJzLmZvckVhY2gobWFya2VyID0+IG1hcmtlci5zZXRNYXAodGhpcy5tYXApKTtcblx0XHR9LFxuXHRcdGluaXRMaXN0ZW5lcnMoKXtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZSh0aGlzLm1hcCwgJ2lkbGUnLCAoKSA9PiB0aGlzLmlzUmVhZHkgPSB0cnVlKTtcblx0XHRcdGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKHRoaXMubWFwLCAnaWRsZScsICgpID0+IHRoaXMubWFwQ2VudHJlID0gdGhpcy5tYXAuZ2V0Q2VudGVyKCkpO1xuXHRcdFx0Z29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAncmVzaXplJywgKCkgPT4gdGhpcy5tYXAuc2V0Q2VudGVyKHRoaXMubWFwQ2VudHJlKSk7XG5cdFx0fS8qLFxuXHRcdGNsZWFyTWFya2VycygpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1hcmtlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uKG1hcmtlcil7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlci5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGlkaWZpZXIuY2xlYXJNYXJrZXJzKCk7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9Ki9cblx0fTtcblxubGV0IHNldHRpbmdzID0ge30sXG5cdGxvY2F0aW9ucyA9IFtdLFxuXHRlbGVtZW50ID0gZmFsc2U7XG5cbmNvbnN0IHJ1biA9ICgpID0+IGRlbGV0ZSB3aW5kb3cuJF9fR01BUElMb2FkZWRfXyQ7XG5cbmNvbnN0IGluaXQgPSAoc2VsLCBsb2NzLCBvcHRzKSA9PiB7XG5cdGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsKSxcblx0XHRBUElQYXRoID0gQ09OU1RBTlRTLkdNQVBJICsgKCFvcHRzIHx8ICFvcHRzLmtleSA/ICcnIDogJyZrZXk9JyArIG9wdHMua2V5KTtcblxuXHRpZighZWwpIHRocm93IG5ldyBFcnJvcignTm8gRE9NIGVsZW1lbnQgc3VwcGxpZWQgdG8gY29udGFpbiBtYXAnKTtcbiAgICBcblx0c2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0cyk7XG5cdGxvY2F0aW9ucyA9IGxvY3M7XG5cdGVsZW1lbnQgPSBlbDtcblx0d2luZG93LiRfX0dNQVBJTG9hZGVkX18kID0gcnVuO1xuXHRcblx0cmV0dXJuIExvYWQoW0FQSVBhdGhdKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoU3Rvcm1Hb29nbGVNYXApLCB7XG5cdFx0XHRcdHNldHRpbmdzOiBzZXR0aW5nc1xuXHRcdFx0fSkuaW5pdCgpO1xuXHRcdH0pXG5cdFx0LmNhdGNoKGUgPT4gY29uc29sZS5sb2coYFNjcmlwdCBsb2FkaW5nIGVycm9yOiAke2UubWVzc2FnZX1gKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGluaXQgfTsiLCIvKipcbiAqIEBuYW1lIHN0b3JtLWxvYWQ6IExpZ2h0d2VpZ2h0IHByb21pc2UtYmFzZWQgc2NyaXB0IGxvYWRlclxuICogQHZlcnNpb24gMC4zLjA6IFR1ZSwgMTAgSmFuIDIwMTcgMTM6MzU6NTMgR01UXG4gKiBAYXV0aG9yIHN0b3JtaWRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5jb25zdCBjcmVhdGUgPSB1cmwgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0cy5zcmMgPSB1cmw7XG5cdFx0cy5vbmxvYWQgPSBzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSByZXNvbHZlKCk7XG5cdFx0fTtcblx0XHRzLm9uZXJyb3IgPSBzLm9uYWJvcnQgPSByZWplY3Q7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3luY2hyb25vdXMgPSB1cmxzID0+IHtcblx0aWYoIUFycmF5LmlzQXJyYXkodXJscykpIHRocm93IG5ldyBFcnJvcignTXVzdCBiZSBhbiBhcnJheSBvZiBVUkxzJyk7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgbmV4dCA9ICgpID0+IHtcblx0XHRcdGlmICghdXJscy5sZW5ndGgpIHJldHVybiByZXNvbHZlKCk7XG5cdFx0XHRjcmVhdGUodXJscy5zaGlmdCgpKS50aGVuKG5leHQpLmNhdGNoKHJlamVjdCk7XG5cdFx0fTtcblx0XHRuZXh0KCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHVybHMsIGFzeW5jID0gdHJ1ZSkgPT4ge1xuXHRpZiAoIWFzeW5jKSByZXR1cm4gc3luY2hyb25vdXModXJscyk7XG5cdFxuXHRpZighQXJyYXkuaXNBcnJheSh1cmxzKSkgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGJlIGFuIGFycmF5IG9mIFVSTHMnKTsgXG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHVybHMubWFwKHVybCA9PiBjcmVhdGUodXJsKSkpO1xufTsiXX0=
