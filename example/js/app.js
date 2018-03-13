(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {

	(0, _stormLoad2.default)('./js/storm-google-map.standalone.js').then(function () {
		StormGoogleMap.init('#js-map', [{
			id: 'Storm',
			title: 'Storm Id',
			location: {
				lat: 55.9749013,
				lng: -3.1669848
			}
		}, {
			id: 'Waverley',
			title: 'Waverley Station',
			location: {
				// lat: 55.9519979,
				// lng: -3.1899702
				lat: 55.9749013,
				lng: -3.1669848
			}

		}], {
			moduleBasePath: './js/'
		}).then(function (res) {
			console.log(res);
		});
	});
}];

if ('addEventListener' in window) window.addEventListener('DOMContentLoaded', function () {
	onDOMContentLoadedTasks.forEach(function (fn) {
		return fn();
	});
});

},{"storm-load":2}],2:[function(require,module,exports){
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

var synchronous = exports.synchronous = function synchronous(urls) {
	return new Promise(function (resolve, reject) {
		var next = function next() {
			if (!urls.length) return resolve();
			create(urls.shift(), false).then(next).catch(reject);
		};
		next();
	});
};

exports.default = function (urls) {
	var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	urls = [].concat(urls);
	if (!async) return synchronous(urls);

	return Promise.all(urls.map(function (url) {
		return create(url);
	}));
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFFdEM7OzBCQUFBLEFBQUssdUNBQUwsQUFDRSxLQUFLLFlBQU0sQUFDWDtpQkFBQSxBQUFlLEtBQWYsQUFBb0I7T0FDbkIsQUFDSyxBQUNKO1VBRkQsQUFFUSxBQUNQOztTQUFXLEFBQ0wsQUFDTDtTQUFLLENBTnVCLEFBQzlCLEFBR1ksQUFFSjtBQUZJLEFBQ1Y7QUFKRixBQUNDLEdBRjZCO09BUzlCLEFBQ0ssQUFDSjtVQUZELEFBRVEsQUFDUDs7QUFFQztBQUNBO1NBSFUsQUFHTCxBQUNMO1NBQUssQ0FoQlIsQUFBK0IsQUFTOUIsQUFHWSxBQUlKO0FBSkksQUFDVjs7QUFKRixBQUNDO21CQVZGLEFBbUJJLEFBQ2E7QUFEYixBQUNILEtBcEJELEFBc0JFLEtBQUssZUFBTyxBQUNaO1dBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjtBQXhCRixBQXlCQTtBQTNCRixBQTRCQTtBQTlCRCxBQUFnQyxDQUFBOztBQWdDaEMsSUFBRyxzQkFBSCxBQUF5QixlQUFRLEFBQU8saUJBQVAsQUFBd0Isb0JBQW9CLFlBQU0sQUFBRTt5QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO1NBQUEsQUFBUTtBQUF4QyxBQUFnRDtBQUFwRyxDQUFBOzs7Ozs7OztBQ2xDakM7Ozs7OztBQU1BLElBQU0sU0FBUyxTQUFULE1BQVMsQ0FBQyxHQUFELEVBQXVCO0FBQUEsS0FBakIsS0FBaUIsdUVBQVQsSUFBUzs7QUFDckMsUUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3ZDLE1BQUksSUFBSSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBUjtBQUNBLElBQUUsR0FBRixHQUFRLEdBQVI7QUFDQSxJQUFFLEtBQUYsR0FBVSxLQUFWO0FBQ0EsSUFBRSxNQUFGLEdBQVcsRUFBRSxrQkFBRixHQUF1QixZQUFXO0FBQzVDLE9BQUksQ0FBQyxLQUFLLFVBQU4sSUFBb0IsS0FBSyxVQUFMLEtBQW9CLFVBQTVDLEVBQXdEO0FBQ3hELEdBRkQ7QUFHQSxJQUFFLE9BQUYsR0FBWSxFQUFFLE9BQUYsR0FBWSxNQUF4QjtBQUNBLFdBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUI7QUFDQSxFQVRNLENBQVA7QUFVQSxDQVhEOztBQWFPLElBQU0sb0NBQWMsU0FBZCxXQUFjLE9BQVE7QUFDbEMsUUFBTyxJQUFJLE9BQUosQ0FBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3ZDLE1BQUksT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNoQixPQUFJLENBQUMsS0FBSyxNQUFWLEVBQWtCLE9BQU8sU0FBUDtBQUNsQixVQUFPLEtBQUssS0FBTCxFQUFQLEVBQXFCLEtBQXJCLEVBQTRCLElBQTVCLENBQWlDLElBQWpDLEVBQXVDLEtBQXZDLENBQTZDLE1BQTdDO0FBQ0EsR0FIRDtBQUlBO0FBQ0EsRUFOTSxDQUFQO0FBT0EsQ0FSTTs7a0JBVVEsVUFBQyxJQUFELEVBQXdCO0FBQUEsS0FBakIsS0FBaUIsdUVBQVQsSUFBUzs7QUFDdEMsUUFBTyxHQUFHLE1BQUgsQ0FBVSxJQUFWLENBQVA7QUFDQSxLQUFJLENBQUMsS0FBTCxFQUFZLE9BQU8sWUFBWSxJQUFaLENBQVA7O0FBRVosUUFBTyxRQUFRLEdBQVIsQ0FBWSxLQUFLLEdBQUwsQ0FBUztBQUFBLFNBQU8sT0FBTyxHQUFQLENBQVA7QUFBQSxFQUFULENBQVosQ0FBUDtBQUNBLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsImltcG9ydCBMb2FkIGZyb20gJ3N0b3JtLWxvYWQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cblx0TG9hZCgnLi9qcy9zdG9ybS1nb29nbGUtbWFwLnN0YW5kYWxvbmUuanMnKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFN0b3JtR29vZ2xlTWFwLmluaXQoJyNqcy1tYXAnLCBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogJ1N0b3JtJyxcblx0XHRcdFx0XHR0aXRsZTogJ1N0b3JtIElkJyxcblx0XHRcdFx0XHRsb2NhdGlvbiA6IHsgXG5cdFx0XHRcdFx0XHRsYXQ6IDU1Ljk3NDkwMTMsXG5cdFx0XHRcdFx0XHRsbmc6IC0zLjE2Njk4NDhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogJ1dhdmVybGV5Jyxcblx0XHRcdFx0XHR0aXRsZTogJ1dhdmVybGV5IFN0YXRpb24nLFxuXHRcdFx0XHRcdGxvY2F0aW9uIDoge1xuXHRcdFx0XHRcdFx0Ly8gbGF0OiA1NS45NTE5OTc5LFxuXHRcdFx0XHRcdFx0Ly8gbG5nOiAtMy4xODk5NzAyXG5cdFx0XHRcdFx0XHRsYXQ6IDU1Ljk3NDkwMTMsXG5cdFx0XHRcdFx0XHRsbmc6IC0zLjE2Njk4NDhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0fV0sIHtcblx0XHRcdFx0bW9kdWxlQmFzZVBhdGg6ICcuL2pzLydcblx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tbG9hZDogTGlnaHR3ZWlnaHQgcHJvbWlzZS1iYXNlZCBzY3JpcHQgbG9hZGVyXG4gKiBAdmVyc2lvbiAxLjAuMjogRnJpLCAwOSBNYXIgMjAxOCAxNjowMTo0MyBHTVRcbiAqIEBhdXRob3Igc3Rvcm1pZFxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbmNvbnN0IGNyZWF0ZSA9ICh1cmwsIGFzeW5jID0gdHJ1ZSkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0cy5zcmMgPSB1cmw7XG5cdFx0cy5hc3luYyA9IGFzeW5jO1xuXHRcdHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5yZWFkeVN0YXRlIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykgcmVzb2x2ZSgpO1xuXHRcdH07XG5cdFx0cy5vbmVycm9yID0gcy5vbmFib3J0ID0gcmVqZWN0O1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN5bmNocm9ub3VzID0gdXJscyA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IG5leHQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIXVybHMubGVuZ3RoKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdFx0Y3JlYXRlKHVybHMuc2hpZnQoKSwgZmFsc2UpLnRoZW4obmV4dCkuY2F0Y2gocmVqZWN0KTtcblx0XHR9O1xuXHRcdG5leHQoKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAodXJscywgYXN5bmMgPSB0cnVlKSA9PiB7XG5cdHVybHMgPSBbXS5jb25jYXQodXJscyk7XG5cdGlmICghYXN5bmMpIHJldHVybiBzeW5jaHJvbm91cyh1cmxzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwodXJscy5tYXAodXJsID0+IGNyZWF0ZSh1cmwpKSk7XG59OyJdfQ==
