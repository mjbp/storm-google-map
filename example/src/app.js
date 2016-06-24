var STORM = (function(w, d) {
	'use strict';
    
    var GoogleMap = require('./libs/storm-google-map'),
        init = function() {
            var locations = [
                {
                    id: "Storm",
                    title: "StormId",
                    location : { 
                        lat: 55.9749013,
                        lng: -3.1669848
                    }
                },
                {
                    id: "Waverley",
                    title: "Waverley Station",
                    location : {
                        lat: 55.9519979,
                        lng: -3.1899702
                    }
                }
            ];

            GoogleMap.init('#js-map', locations);
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);