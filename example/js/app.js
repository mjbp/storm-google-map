(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
				lat: 55.9519979,
				lng: -3.1899702
			}
		}]).then(function (res) {
			console.log(res);
		});
	});

	/*
 GoogleMap.init('#js-map', [
 	{
 		id: 'Storm',
 		title: 'StormId',
 		location : { 
 			lat: 55.9749013,
 			lng: -3.1669848
 		}
 	},
 	{
 		id: 'Waverley',
 		title: 'Waverley Station',
 		location : {
 			lat: 55.9519979,
 			lng: -3.1899702
 		}
 	}])
 	.then(res => {
 		console.log(res);
 	});
 	*/
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

var synchronous = exports.synchronous = function synchronous(urls) {
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

	urls = [].concat(urls);
	if (!async) return synchronous(urls);

	return Promise.all(urls.map(function (url) {
		return create(url);
	}));
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFFdEM7OzBCQUFBLEFBQUssdUNBQUwsQUFDRSxLQUFLLFlBQU0sQUFDWDtpQkFBQSxBQUFlLEtBQWYsQUFBb0I7T0FDbkIsQUFDSyxBQUNKO1VBRkQsQUFFUSxBQUNQOztTQUFXLEFBQ0wsQUFDTDtTQUFLLENBTnVCLEFBQzlCLEFBR1ksQUFFSjtBQUZJLEFBQ1Y7QUFKRixBQUNDLEdBRjZCO09BUzlCLEFBQ0ssQUFDSjtVQUZELEFBRVEsQUFDUDs7U0FBVyxBQUNMLEFBQ0w7U0FBSyxDQWRSLEFBQStCLEFBUzlCLEFBR1ksQUFFSjtBQUZJLEFBQ1Y7QUFKRixBQUNDLE1BVkYsQUFpQkUsS0FBSyxlQUFPLEFBQ1o7V0FBQSxBQUFRLElBQVIsQUFBWSxBQUNaO0FBbkJGLEFBb0JBO0FBdEJGLEFBd0JBOztBQXNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWhERCxBQUFnQyxDQUFBOztBQWtEaEMsSUFBRyxzQkFBSCxBQUF5QixlQUFRLEFBQU8saUJBQVAsQUFBd0Isb0JBQW9CLFlBQU0sQUFBRTt5QkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO1NBQUEsQUFBUTtBQUF4QyxBQUFnRDtBQUFwRyxDQUFBOzs7Ozs7OztBQ3BEakM7Ozs7OztBQU1BLElBQU0sU0FBUyxTQUFULE1BQVMsTUFBTztBQUNyQixRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBSSxJQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0EsSUFBRSxHQUFGLEdBQVEsR0FBUjtBQUNBLElBQUUsTUFBRixHQUFXLEVBQUUsa0JBQUYsR0FBdUIsWUFBVztBQUM1QyxPQUFJLENBQUMsS0FBSyxVQUFOLElBQW9CLEtBQUssVUFBTCxLQUFvQixVQUE1QyxFQUF3RDtBQUN4RCxHQUZEO0FBR0EsSUFBRSxPQUFGLEdBQVksRUFBRSxPQUFGLEdBQVksTUFBeEI7QUFDQSxXQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLENBQTFCO0FBQ0EsRUFSTSxDQUFQO0FBU0EsQ0FWRDs7QUFZTyxJQUFNLG9DQUFjLFNBQWQsV0FBYyxPQUFRO0FBQ2xDLFFBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN2QyxNQUFJLE9BQU8sU0FBUCxJQUFPLEdBQU07QUFDaEIsT0FBSSxDQUFDLEtBQUssTUFBVixFQUFrQixPQUFPLFNBQVA7QUFDbEIsVUFBTyxLQUFLLEtBQUwsRUFBUCxFQUFxQixJQUFyQixDQUEwQixJQUExQixFQUFnQyxLQUFoQyxDQUFzQyxNQUF0QztBQUNBLEdBSEQ7QUFJQTtBQUNBLEVBTk0sQ0FBUDtBQU9BLENBUk07O2tCQVVRLFVBQUMsSUFBRCxFQUF3QjtBQUFBLEtBQWpCLEtBQWlCLHVFQUFULElBQVM7O0FBQ3RDLFFBQU8sR0FBRyxNQUFILENBQVUsSUFBVixDQUFQO0FBQ0EsS0FBSSxDQUFDLEtBQUwsRUFBWSxPQUFPLFlBQVksSUFBWixDQUFQOztBQUVaLFFBQU8sUUFBUSxHQUFSLENBQVksS0FBSyxHQUFMLENBQVM7QUFBQSxTQUFPLE9BQU8sR0FBUCxDQUFQO0FBQUEsRUFBVCxDQUFaLENBQVA7QUFDQSxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBMb2FkIGZyb20gJ3N0b3JtLWxvYWQnO1xuXG5jb25zdCBvbkRPTUNvbnRlbnRMb2FkZWRUYXNrcyA9IFsoKSA9PiB7XG5cblx0TG9hZCgnLi9qcy9zdG9ybS1nb29nbGUtbWFwLnN0YW5kYWxvbmUuanMnKVxuXHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFN0b3JtR29vZ2xlTWFwLmluaXQoJyNqcy1tYXAnLCBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogJ1N0b3JtJyxcblx0XHRcdFx0XHR0aXRsZTogJ1N0b3JtIElkJyxcblx0XHRcdFx0XHRsb2NhdGlvbiA6IHsgXG5cdFx0XHRcdFx0XHRsYXQ6IDU1Ljk3NDkwMTMsXG5cdFx0XHRcdFx0XHRsbmc6IC0zLjE2Njk4NDhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogJ1dhdmVybGV5Jyxcblx0XHRcdFx0XHR0aXRsZTogJ1dhdmVybGV5IFN0YXRpb24nLFxuXHRcdFx0XHRcdGxvY2F0aW9uIDoge1xuXHRcdFx0XHRcdFx0bGF0OiA1NS45NTE5OTc5LFxuXHRcdFx0XHRcdFx0bG5nOiAtMy4xODk5NzAyXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XSlcblx0XHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXMpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblxuXHQvKlxuXHRHb29nbGVNYXAuaW5pdCgnI2pzLW1hcCcsIFtcblx0XHR7XG5cdFx0XHRpZDogJ1N0b3JtJyxcblx0XHRcdHRpdGxlOiAnU3Rvcm1JZCcsXG5cdFx0XHRsb2NhdGlvbiA6IHsgXG5cdFx0XHRcdGxhdDogNTUuOTc0OTAxMyxcblx0XHRcdFx0bG5nOiAtMy4xNjY5ODQ4XG5cdFx0XHR9XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogJ1dhdmVybGV5Jyxcblx0XHRcdHRpdGxlOiAnV2F2ZXJsZXkgU3RhdGlvbicsXG5cdFx0XHRsb2NhdGlvbiA6IHtcblx0XHRcdFx0bGF0OiA1NS45NTE5OTc5LFxuXHRcdFx0XHRsbmc6IC0zLjE4OTk3MDJcblx0XHRcdH1cblx0XHR9XSlcblx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHR9KTtcblx0XHQqL1xufV07XG4gICAgXG5pZignYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHsgb25ET01Db250ZW50TG9hZGVkVGFza3MuZm9yRWFjaCgoZm4pID0+IGZuKCkpOyB9KTsiLCIvKipcbiAqIEBuYW1lIHN0b3JtLWxvYWQ6IExpZ2h0d2VpZ2h0IHByb21pc2UtYmFzZWQgc2NyaXB0IGxvYWRlclxuICogQHZlcnNpb24gMC40LjA6IEZyaSwgMjAgSmFuIDIwMTcgMTY6NTc6MzQgR01UXG4gKiBAYXV0aG9yIHN0b3JtaWRcbiAqIEBsaWNlbnNlIE1JVFxuICovXG5jb25zdCBjcmVhdGUgPSB1cmwgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGxldCBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0cy5zcmMgPSB1cmw7XG5cdFx0cy5vbmxvYWQgPSBzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSByZXNvbHZlKCk7XG5cdFx0fTtcblx0XHRzLm9uZXJyb3IgPSBzLm9uYWJvcnQgPSByZWplY3Q7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3luY2hyb25vdXMgPSB1cmxzID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgbmV4dCA9ICgpID0+IHtcblx0XHRcdGlmICghdXJscy5sZW5ndGgpIHJldHVybiByZXNvbHZlKCk7XG5cdFx0XHRjcmVhdGUodXJscy5zaGlmdCgpKS50aGVuKG5leHQpLmNhdGNoKHJlamVjdCk7XG5cdFx0fTtcblx0XHRuZXh0KCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgKHVybHMsIGFzeW5jID0gdHJ1ZSkgPT4ge1xuXHR1cmxzID0gW10uY29uY2F0KHVybHMpO1xuXHRpZiAoIWFzeW5jKSByZXR1cm4gc3luY2hyb25vdXModXJscyk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHVybHMubWFwKHVybCA9PiBjcmVhdGUodXJsKSkpO1xufTsiXX0=
