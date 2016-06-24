(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormGoogleMap = factory();
  }
}(this, function() {
	'use strict';

    var CONSTANTS = {
            GMAPI: 'http://maps.googleapis.com/maps/api/js?v=3&callback=$__GMAPILoaded__$',
            TIMEOUT: 6000
        },
        settings,
        locations,
        element,
        defaults = {
            key: null,
            map : {
                options : {
                    scaleControl: false,
                    mapTypeControl: false,
                    overviewMapControl: true,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: true,
                    maxZoom: 16,
                    zoomControl: true,
                    styles : [
                        {stylers: [{visibility: "on"}, {saturation: -100, hue: '#000000' }]},
                        {featureType: "road.local", stylers: [{ visibility: "simplified" }]},
                        {featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]},
                        {featureType: "landscape.man_made", stylers: [{ visibility: "on" }]},
                        {featureType: "transit", stylers: [{ visibility: "on" }]}
                    ]
                },
                markerIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
            }
        },
        StormGoogleMaps = {
            init: function(){
                this.markers = [];
                this.locations = locations;
                this.element = element;
                this.createMarkers();
                this.map = new google.maps.Map(element, this.settings.map.options);
                this.placeMarkers();
                this.setBoundary();
            },
            createMarkers: function(){
                this.boundary = new google.maps.LatLngBounds();
                this.markers = this.locations.map(function(m){
                    var latLng = new google.maps.LatLng(m.location.lat, m.location.lng)
                    
                    this.boundary.extend(latLng);
                    return new google.maps.Marker({
                        position: latLng,
                        clickable: false,
                        icon: {
                            url: this.settings.map.markerIcon,
                            scaledSize: new google.maps.Size(24,24)
                        },
                        optimized: false,
                    });
                }.bind(this));
                
            },
            setBoundary: function () {
                if (this.markers.length > 1) {
                    this.map.fitBounds(this.boundary);
                } else {
                    this.map.setCenter(this.boundary.getCenter());
                    this.map.setZoom(this.zoom);
                }
            },
            placeMarkers: function() {
                this.markers.forEach(function(marker){
                    marker.setMap(this.map);
                }.bind(this));
            },
            clearMarkers: function() {
                if (this.markers.length > 0) {
                    this.markers.forEach(function(marker){
                        marker.setMap(null);
                    });
                    this.markers.length = 0;
                }
            }
        };


    function create(opts) {
        return Object.assign(Object.create(StormGoogleMaps), {
            settings: Object.assign({}, defaults, opts)
        }).init();
    }


    function appendScript(src, cb) {
        var script = document.createElement('script'),
            timer = window.setTimeout(function() {
                throw new Error('Script ' + src + ' failed to load in time.');
            }, CONSTANTS.TIMEOUT);
        script.src = src;
        script.onload = function() {
            window.clearTimeout(timer);
            !!cb && cb();
        };
        document.body.appendChild(script);
    };

    function $__GMAPILoaded__$(){
        return create(settings);
    }

	function init(sel, locs, opts) {
        var el = document.querySelector(sel),
            APIPath = CONSTANTS.GMAPI + (!opts || !!opts.key ? '' : '&key=' + opts.key);
        
        if(!el) {
            throw new Error('No DOM element supplied to contain map');
        }
        settings = Object.assign({}, defaults, opts);
        locations = locs;
        element = el;
		window.$__GMAPILoaded__$ = $__GMAPILoaded__$;
		
        appendScript(APIPath);
	}
	
	return {
        init: init
    };
 }));