var STORM = (function(w, d) {
	'use strict';
    
    var Map = require('./libs/map'),
        init = function() {
            var mapHolder = d.getElementById('map');
            if(!!mapHolder) {
                Map.asyncGoogleMapAPI(mapHolder, w.locations);
            }
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);