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
        lat: 55.9519979,
        lng: -3.1899702
      }

    }], { moduleBasePath: './js/' }).then(function (res) {
      console.log(res);
      window.__SGM__ = res;
    });
  });
}];

{
  onDOMContentLoadedTasks.forEach(function (fn) {
    return fn();
  });
};

/*

function initMap() {
  var pointA = new google.maps.LatLng(51.7519, -1.2578),
    pointB = new google.maps.LatLng(50.8429, -0.1313),
    myOptions = {
      zoom: 7,
      center: pointA
    },
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });

  // get route from A to B
  calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}



function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

initMap();

*/

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL3NyYy9hcHAuanMiLCJub2RlX21vZHVsZXMvc3Rvcm0tbG9hZC9kaXN0L3N0b3JtLWxvYWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7OztBQUVBLElBQU0sMkJBQTJCLFlBQU0sQUFFdEM7OzJCQUFBLEFBQUssdUNBQUwsQUFDRSxLQUFLLFlBQU0sQUFDWDttQkFBQSxBQUNFLEtBREYsQUFDTztVQUNMLEFBQ0ssQUFDSjthQUZELEFBRVEsQUFDUDs7YUFBVyxBQUNMLEFBQ0w7YUFBSyxDQU5TLEFBQ2hCLEFBR1ksQUFFSjtBQUZJLEFBQ1Y7QUFKRixBQUNDLEtBRmU7VUFTaEIsQUFDSyxBQUNKO2FBRkQsQUFFUSxBQUNQOzthQUFXLEFBQ0wsQUFDTDthQUFLLENBZlQsQUFDa0IsQUFTaEIsQUFHWSxBQUVKO0FBRkksQUFDVjs7QUFKRixBQUNDLFFBT0UsRUFBRSxnQkFsQlAsQUFrQkssQUFBa0IsV0FsQnZCLEFBbUJFLEtBQUssZUFBTyxBQUNaO2NBQUEsQUFBUSxJQUFSLEFBQVksQUFDWjthQUFBLEFBQU8sVUFBUCxBQUFpQixBQUNqQjtBQXRCRixBQXVCQTtBQXpCRixBQTBCQTtBQTVCRCxBQUFnQyxDQUFBOztBQThCaEMsQUFBRTswQkFBQSxBQUF3QixRQUFRLFVBQUEsQUFBQyxJQUFEO1dBQUEsQUFBUTtBQUF4QyxBQUFnRDs7O0FBR2xEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTs7Ozs7O0FBTUEsSUFBTSxTQUFTLFNBQVQsTUFBUyxDQUFDLEdBQUQsRUFBdUI7QUFBQSxLQUFqQixLQUFpQix1RUFBVCxJQUFTOztBQUNyQyxRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBSSxJQUFJLFNBQVMsYUFBVCxDQUF1QixRQUF2QixDQUFSO0FBQ0EsSUFBRSxHQUFGLEdBQVEsR0FBUjtBQUNBLElBQUUsS0FBRixHQUFVLEtBQVY7QUFDQSxJQUFFLE1BQUYsR0FBVyxFQUFFLGtCQUFGLEdBQXVCLFlBQVc7QUFDNUMsT0FBSSxDQUFDLEtBQUssVUFBTixJQUFvQixLQUFLLFVBQUwsS0FBb0IsVUFBNUMsRUFBd0Q7QUFDeEQsR0FGRDtBQUdBLElBQUUsT0FBRixHQUFZLEVBQUUsT0FBRixHQUFZLE1BQXhCO0FBQ0EsV0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQjtBQUNBLEVBVE0sQ0FBUDtBQVVBLENBWEQ7O0FBYU8sSUFBTSxvQ0FBYyxTQUFkLFdBQWMsT0FBUTtBQUNsQyxRQUFPLElBQUksT0FBSixDQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdkMsTUFBSSxPQUFPLFNBQVAsSUFBTyxHQUFNO0FBQ2hCLE9BQUksQ0FBQyxLQUFLLE1BQVYsRUFBa0IsT0FBTyxTQUFQO0FBQ2xCLFVBQU8sS0FBSyxLQUFMLEVBQVAsRUFBcUIsS0FBckIsRUFBNEIsSUFBNUIsQ0FBaUMsSUFBakMsRUFBdUMsS0FBdkMsQ0FBNkMsTUFBN0M7QUFDQSxHQUhEO0FBSUE7QUFDQSxFQU5NLENBQVA7QUFPQSxDQVJNOztrQkFVUSxVQUFDLElBQUQsRUFBd0I7QUFBQSxLQUFqQixLQUFpQix1RUFBVCxJQUFTOztBQUN0QyxRQUFPLEdBQUcsTUFBSCxDQUFVLElBQVYsQ0FBUDtBQUNBLEtBQUksQ0FBQyxLQUFMLEVBQVksT0FBTyxZQUFZLElBQVosQ0FBUDs7QUFFWixRQUFPLFFBQVEsR0FBUixDQUFZLEtBQUssR0FBTCxDQUFTO0FBQUEsU0FBTyxPQUFPLEdBQVAsQ0FBUDtBQUFBLEVBQVQsQ0FBWixDQUFQO0FBQ0EsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiaW1wb3J0IExvYWQgZnJvbSAnc3Rvcm0tbG9hZCc7XG5cbmNvbnN0IG9uRE9NQ29udGVudExvYWRlZFRhc2tzID0gWygpID0+IHtcblxuXHRMb2FkKCcuL2pzL3N0b3JtLWdvb2dsZS1tYXAuc3RhbmRhbG9uZS5qcycpXG5cdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0U3Rvcm1Hb29nbGVNYXBcblx0XHRcdFx0LmluaXQoJyNqcy1tYXAnLCBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWQ6ICdTdG9ybScsXG5cdFx0XHRcdFx0XHR0aXRsZTogJ1N0b3JtIElkJyxcblx0XHRcdFx0XHRcdGxvY2F0aW9uIDogeyBcblx0XHRcdFx0XHRcdFx0bGF0OiA1NS45NzQ5MDEzLFxuXHRcdFx0XHRcdFx0XHRsbmc6IC0zLjE2Njk4NDhcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlkOiAnV2F2ZXJsZXknLFxuXHRcdFx0XHRcdFx0dGl0bGU6ICdXYXZlcmxleSBTdGF0aW9uJyxcblx0XHRcdFx0XHRcdGxvY2F0aW9uIDoge1xuXHRcdFx0XHRcdFx0XHRsYXQ6IDU1Ljk1MTk5NzksXG5cdFx0XHRcdFx0XHRcdGxuZzogLTMuMTg5OTcwMlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFxuXHRcdFx0XHR9XSwgeyBtb2R1bGVCYXNlUGF0aDogJy4vanMvJyB9KVxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0XHRcdFx0d2luZG93Ll9fU0dNX18gPSByZXM7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xufV07XG4gICAgXG57IG9uRE9NQ29udGVudExvYWRlZFRhc2tzLmZvckVhY2goKGZuKSA9PiBmbigpKTsgfTtcblxuXG4vKlxuXG5mdW5jdGlvbiBpbml0TWFwKCkge1xuICB2YXIgcG9pbnRBID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1MS43NTE5LCAtMS4yNTc4KSxcbiAgICBwb2ludEIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDUwLjg0MjksIC0wLjEzMTMpLFxuICAgIG15T3B0aW9ucyA9IHtcbiAgICAgIHpvb206IDcsXG4gICAgICBjZW50ZXI6IHBvaW50QVxuICAgIH0sXG4gICAgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwLWNhbnZhcycpLCBteU9wdGlvbnMpLFxuICAgIC8vIEluc3RhbnRpYXRlIGEgZGlyZWN0aW9ucyBzZXJ2aWNlLlxuICAgIGRpcmVjdGlvbnNTZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlLFxuICAgIGRpcmVjdGlvbnNEaXNwbGF5ID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNSZW5kZXJlcih7XG4gICAgICBtYXA6IG1hcFxuICAgIH0pLFxuICAgIG1hcmtlckEgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiBwb2ludEEsXG4gICAgICB0aXRsZTogXCJwb2ludCBBXCIsXG4gICAgICBsYWJlbDogXCJBXCIsXG4gICAgICBtYXA6IG1hcFxuICAgIH0pLFxuICAgIG1hcmtlckIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgIHBvc2l0aW9uOiBwb2ludEIsXG4gICAgICB0aXRsZTogXCJwb2ludCBCXCIsXG4gICAgICBsYWJlbDogXCJCXCIsXG4gICAgICBtYXA6IG1hcFxuICAgIH0pO1xuXG4gIC8vIGdldCByb3V0ZSBmcm9tIEEgdG8gQlxuICBjYWxjdWxhdGVBbmREaXNwbGF5Um91dGUoZGlyZWN0aW9uc1NlcnZpY2UsIGRpcmVjdGlvbnNEaXNwbGF5LCBwb2ludEEsIHBvaW50Qik7XG5cbn1cblxuXG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUFuZERpc3BsYXlSb3V0ZShkaXJlY3Rpb25zU2VydmljZSwgZGlyZWN0aW9uc0Rpc3BsYXksIHBvaW50QSwgcG9pbnRCKSB7XG4gIGRpcmVjdGlvbnNTZXJ2aWNlLnJvdXRlKHtcbiAgICBvcmlnaW46IHBvaW50QSxcbiAgICBkZXN0aW5hdGlvbjogcG9pbnRCLFxuICAgIHRyYXZlbE1vZGU6IGdvb2dsZS5tYXBzLlRyYXZlbE1vZGUuRFJJVklOR1xuICB9LCBmdW5jdGlvbihyZXNwb25zZSwgc3RhdHVzKSB7XG4gICAgaWYgKHN0YXR1cyA9PSBnb29nbGUubWFwcy5EaXJlY3Rpb25zU3RhdHVzLk9LKSB7XG4gICAgICBkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmFsZXJ0KCdEaXJlY3Rpb25zIHJlcXVlc3QgZmFpbGVkIGR1ZSB0byAnICsgc3RhdHVzKTtcbiAgICB9XG4gIH0pO1xufVxuXG5pbml0TWFwKCk7XG5cbiovIiwiLyoqXG4gKiBAbmFtZSBzdG9ybS1sb2FkOiBMaWdodHdlaWdodCBwcm9taXNlLWJhc2VkIHNjcmlwdCBsb2FkZXJcbiAqIEB2ZXJzaW9uIDEuMC4yOiBGcmksIDA5IE1hciAyMDE4IDE2OjAxOjQzIEdNVFxuICogQGF1dGhvciBzdG9ybWlkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuY29uc3QgY3JlYXRlID0gKHVybCwgYXN5bmMgPSB0cnVlKSA9PiB7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0bGV0IHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0XHRzLnNyYyA9IHVybDtcblx0XHRzLmFzeW5jID0gYXN5bmM7XG5cdFx0cy5vbmxvYWQgPSBzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCF0aGlzLnJlYWR5U3RhdGUgfHwgdGhpcy5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSByZXNvbHZlKCk7XG5cdFx0fTtcblx0XHRzLm9uZXJyb3IgPSBzLm9uYWJvcnQgPSByZWplY3Q7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3luY2hyb25vdXMgPSB1cmxzID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRsZXQgbmV4dCA9ICgpID0+IHtcblx0XHRcdGlmICghdXJscy5sZW5ndGgpIHJldHVybiByZXNvbHZlKCk7XG5cdFx0XHRjcmVhdGUodXJscy5zaGlmdCgpLCBmYWxzZSkudGhlbihuZXh0KS5jYXRjaChyZWplY3QpO1xuXHRcdH07XG5cdFx0bmV4dCgpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0ICh1cmxzLCBhc3luYyA9IHRydWUpID0+IHtcblx0dXJscyA9IFtdLmNvbmNhdCh1cmxzKTtcblx0aWYgKCFhc3luYykgcmV0dXJuIHN5bmNocm9ub3VzKHVybHMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbCh1cmxzLm1hcCh1cmwgPT4gY3JlYXRlKHVybCkpKTtcbn07Il19
