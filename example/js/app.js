(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _stormLoad = require('storm-load');

var _stormLoad2 = _interopRequireDefault(_stormLoad);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

var onDOMContentLoadedTasks = [function () {

	(0, _stormLoad2.default)('./js/storm-google-map-index.standalone.js').then(function () {
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
				lat: 55.9519979,
				lng: -3.1899702
			}
		}]).then(function (res) {
			console.log(res);
		});

		StormGoogleMap.init('#js-map-2', [{
			id: 'Storm',
			title: 'Storm Id',
			location: {
				lat: 55.9749013,
				lng: -3.1669848
			}
		}]).then(function (res) {
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
 * @version 0.5.1: Fri, 10 Mar 2017 17:30:13 GMT
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFFdEM7OzBCQUFBLEFBQUssNkNBQUwsQUFDRSxLQUFLLFlBQU0sQUFDWDtpQkFBQSxBQUFlLEtBQWYsQUFBb0I7T0FDbkIsQUFDSyxBQUNKO1VBRkQsQUFFUSxBQUNQOztTQUFXLEFBQ0wsQUFDTDtTQUFLLENBTnVCLEFBQzlCLEFBR1ksQUFFSjtBQUZJLEFBQ1Y7QUFKRixBQUNDLEdBRjZCO09BUzlCLEFBQ0ssQUFDSjtVQUZELEFBRVEsQUFDUDs7U0FBVyxBQUNMLEFBQ0w7U0FBSyxDQWRSLEFBQStCLEFBUzlCLEFBR1ksQUFFSjtBQUZJLEFBQ1Y7QUFKRixBQUNDLE1BVkYsQUFpQkUsS0FBSyxlQUFPLEFBQ1o7V0FBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBbkJGLEFBcUJBOztpQkFBQSxBQUFlLEtBQWYsQUFBb0I7T0FDbkIsQUFDSyxBQUNKO1VBRkQsQUFFUSxBQUNQOztTQUFXLEFBQ0wsQUFDTDtTQUFLLENBTlIsQUFBaUMsQUFDaEMsQUFHWSxBQUVKO0FBRkksQUFDVjtBQUpGLEFBQ0MsR0FGK0IsR0FBakMsQUFTRSxLQUFLLGVBQU8sQUFDWjtXQUFBLEFBQVEsSUFBUixBQUFZLEFBQ1o7QUFYRixBQVlBO0FBbkNGLEFBb0NBO0FBdENELEFBQWdDLENBQUE7O0FBd0NoQyxJQUFHLHNCQUFILEFBQXlCLGVBQVEsQUFBTyxpQkFBUCxBQUF3QixvQkFBb0IsWUFBTSxBQUFFO3lCQUFBLEFBQXdCLFFBQVEsVUFBQSxBQUFDLElBQUQ7U0FBQSxBQUFRO0FBQXhDLEFBQWdEO0FBQXBHLENBQUE7Ozs7Ozs7O0FDMUNqQzs7Ozs7O0FBTUEsSUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFDLEdBQUQsRUFBdUI7QUFBQSxLQUFqQixLQUFpQix1RUFBVCxJQUFTOztBQUNyQyxRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBSSxJQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0EsSUFBRSxHQUFGLEdBQVEsR0FBUjtBQUNBLElBQUUsS0FBRixHQUFVLEtBQVY7QUFDQSxJQUFFLE1BQUYsR0FBVyxFQUFFLGtCQUFGLEdBQXVCLFlBQVc7QUFDNUMsT0FBSSxDQUFDLEtBQUssVUFBTixJQUFvQixLQUFLLFVBQUwsS0FBb0IsVUFBNUMsRUFBd0Q7QUFDeEQsR0FGRDtBQUdBLElBQUUsT0FBRixHQUFZLEVBQUUsT0FBRixHQUFZLE1BQXhCO0FBQ0EsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQjtBQUNBLEVBVE0sQ0FBUDtBQVVBLENBWEQ7O0FBYU8sSUFBTSxvQ0FBYyxTQUFkLFdBQWMsT0FBUTtBQUNsQyxRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBSSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2hCLE9BQUksQ0FBQyxLQUFLLE1BQVYsRUFBa0IsT0FBTyxTQUFQO0FBQ2xCLFVBQU8sS0FBSyxLQUFMLEVBQVAsRUFBcUIsS0FBckIsRUFBNEIsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUMsS0FBdkMsQ0FBNkMsTUFBN0M7QUFDQSxHQUhEO0FBSUE7QUFDQSxFQU5NLENBQVA7QUFPQSxDQVJNOztrQkFVUSxVQUFDLElBQUQsRUFBd0I7QUFBQSxLQUFqQixLQUFpQix1RUFBVCxJQUFTOztBQUN0QyxRQUFPLEdBQUcsTUFBSCxDQUFVLElBQVYsQ0FBUDtBQUNBLEtBQUksQ0FBQyxLQUFMLEVBQVksT0FBTyxZQUFZLElBQVosQ0FBUDs7QUFFWixRQUFPLFFBQVEsR0FBUixDQUFZLEtBQUssR0FBTCxDQUFTO0FBQUEsU0FBTyxPQUFPLEdBQVAsQ0FBUDtBQUFBLEVBQVQsQ0FBWixDQUFQO0FBQ0EsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgTG9hZCBmcm9tICdzdG9ybS1sb2FkJztcblxuY29uc3Qgb25ET01Db250ZW50TG9hZGVkVGFza3MgPSBbKCkgPT4ge1xuXG5cdExvYWQoJy4vanMvc3Rvcm0tZ29vZ2xlLW1hcC1pbmRleC5zdGFuZGFsb25lLmpzJylcblx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRTdG9ybUdvb2dsZU1hcC5pbml0KCcjanMtbWFwJywgW1xuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWQ6ICdTdG9ybScsXG5cdFx0XHRcdFx0dGl0bGU6ICdTdG9ybSBJZCcsXG5cdFx0XHRcdFx0bG9jYXRpb24gOiB7IFxuXHRcdFx0XHRcdFx0bGF0OiA1NS45NzQ5MDEzLFxuXHRcdFx0XHRcdFx0bG5nOiAtMy4xNjY5ODQ4XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWQ6ICdXYXZlcmxleScsXG5cdFx0XHRcdFx0dGl0bGU6ICdXYXZlcmxleSBTdGF0aW9uJyxcblx0XHRcdFx0XHRsb2NhdGlvbiA6IHtcblx0XHRcdFx0XHRcdGxhdDogNTUuOTUxOTk3OSxcblx0XHRcdFx0XHRcdGxuZzogLTMuMTg5OTcwMlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fV0pXG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFN0b3JtR29vZ2xlTWFwLmluaXQoJyNqcy1tYXAtMicsIFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlkOiAnU3Rvcm0nLFxuXHRcdFx0XHRcdHRpdGxlOiAnU3Rvcm0gSWQnLFxuXHRcdFx0XHRcdGxvY2F0aW9uIDogeyBcblx0XHRcdFx0XHRcdGxhdDogNTUuOTc0OTAxMyxcblx0XHRcdFx0XHRcdGxuZzogLTMuMTY2OTg0OFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fV0pXG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG59XTtcbiAgICBcbmlmKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4geyBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcy5mb3JFYWNoKChmbikgPT4gZm4oKSk7IH0pOyIsIi8qKlxuICogQG5hbWUgc3Rvcm0tbG9hZDogTGlnaHR3ZWlnaHQgcHJvbWlzZS1iYXNlZCBzY3JpcHQgbG9hZGVyXG4gKiBAdmVyc2lvbiAwLjUuMTogRnJpLCAxMCBNYXIgMjAxNyAxNzozMDoxMyBHTVRcbiAqIEBhdXRob3Igc3Rvcm1pZFxuICogQGxpY2Vuc2UgTUlUXG4gKi9cbmNvbnN0IGNyZWF0ZSA9ICh1cmwsIGFzeW5jID0gdHJ1ZSkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0cy5zcmMgPSB1cmw7XG5cdFx0cy5hc3luYyA9IGFzeW5jO1xuXHRcdHMub25sb2FkID0gcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0XHRcdGlmICghdGhpcy5yZWFkeVN0YXRlIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykgcmVzb2x2ZSgpO1xuXHRcdH07XG5cdFx0cy5vbmVycm9yID0gcy5vbmFib3J0ID0gcmVqZWN0O1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocyk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IHN5bmNocm9ub3VzID0gdXJscyA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IG5leHQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoIXVybHMubGVuZ3RoKSByZXR1cm4gcmVzb2x2ZSgpO1xuXHRcdFx0Y3JlYXRlKHVybHMuc2hpZnQoKSwgZmFsc2UpLnRoZW4obmV4dCkuY2F0Y2gocmVqZWN0KTtcblx0XHR9O1xuXHRcdG5leHQoKTtcblx0fSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCAodXJscywgYXN5bmMgPSB0cnVlKSA9PiB7XG5cdHVybHMgPSBbXS5jb25jYXQodXJscyk7XG5cdGlmICghYXN5bmMpIHJldHVybiBzeW5jaHJvbm91cyh1cmxzKTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwodXJscy5tYXAodXJsID0+IGNyZWF0ZSh1cmwpKSk7XG59OyJdfQ==
