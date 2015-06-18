var STORM = (function(w, d) {
	'use strict';
    
    var Map = require('./libs/map'),
        init = function() {
            var mapHolder = d.getElementById('map');
            if(!!mapHolder) {
                Map.asyncGoogleMapAPI(w.locations, {
                    cluster: true,
                    spider: true,
                    map : {
                        mapElement: mapHolder,
                        markerIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23ff0000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
                    },
                    spiderifier: {
                        keepSpiderfied: true,
                        markersWontMove: true,
                        markersWontHide: true
                    },
                    clusterer : {
                        maxZoom: 12,
                        gridSize: 20
                    },
                    infobox: {
                        template: '<div class="infobox"><div class="infobox-inner" id="infobox"><a href="{{url}}"><h1 class="infoxbox-heading">{{title}}</h1></a></div></div>',
                        closeIcon: 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FF0000%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
                        boxStyle: {
                            width:'250px',
                            opacity: 1
                        },
                        pixelOffset: [-115, -10]
                    }
                });
            }
        };
	
	return {
		init: init
	};
	
})(window, document, undefined);

if('addEventListener' in window) window.addEventListener('DOMContentLoaded', STORM.init, false);