(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Map = factory();
  }
}(this, function() {
	'use strict';

    var infobox,
		boundary,
        UTILS = require('./utils'),
        settings = {},
        defaults = {
            cluster: true,
            spider: true,
            map : {
                mapElement: null,
                options : {
                    scaleControl: false,
                    mapTypeControl: false,
                    overviewMapControl: true,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: true,
                    maxZoom: 16,
                    zoomControl: true
                }, 
                styles : [
                    {stylers: [{visibility: "on"}, {saturation: -100, hue: '#000000' }]},
                    {featureType: "road.local", stylers: [{ visibility: "simplified" }]},
                    {featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }]},
                    {featureType: "landscape.man_made", stylers: [{ visibility: "on" }]},
                    {featureType: "transit", stylers: [{ visibility: "on" }]}
                ],
                markerIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%202C8.13%202%205%205.13%205%209c0%205.25%207%2013%207%2013s7-7.75%207-13c0-3.87-3.13-7-7-7zm0%209.5c-1.38%200-2.5-1.12-2.5-2.5s1.12-2.5%202.5-2.5%202.5%201.12%202.5%202.5-1.12%202.5-2.5%202.5z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
            },
            spiderifier : {
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
                closeIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
                boxStyle: {
                    width:'250px',
                    opacity: 1
                },
                pixelOffset: [-115, -10]
            }
        };
	
    function Map(locations, opts) {
        settings = UTILS.merge(defaults, opts);
        
        if(!settings.map.mapElement) {
            throw new Error('No DOM element supplied to contain map');
        }
        
        this.markers = [];
        
		this.locations = locations;
		
        
		this.clearMarkers()
			.initMarkers()
			.drawMap();
    }
	
	Map.prototype.makeMarker = function(m) {
		var self = this,
            latlng = new google.maps.LatLng(m.location.latitude, m.location.longitude),
            marker = new google.maps.Marker({
                position: latlng,
                clickable: true,
                infoxBoxData: {
                    title: m.title,
                    url: '/' + m.id
                },
                icon: settings.map.markerIcon
            });
        
		this.markers.push(marker);
		this.boundary.extend(latlng);
		return self;
	};
	
	Map.prototype.initMarkers = function() {
		this.boundary = new google.maps.LatLngBounds();
        
		for (var i = 0; i < this.locations.length; i += 1) {
        	this.makeMarker(this.locations[i]);
		}
		return this;
	};
	
	Map.prototype.clearMarkers = function() {
		if (this.markers.length > 0) {
			for (var i = 0; i < this.markers.length; ++i) {
				this.markers[i].setMap(null);
			}
			this.markers.length = 0;
            this.spidifier.clearMarkers(); 
		}
		return this;
	};
	
	Map.prototype.clickMarker = function() {
        var self = this,
            overlay = {
                template : '<div class="infobox"><div class="infobox-inner" id="infobox"><a href="{{url}}"><h1 class="infoxbox-heading">{{title}}</h1></a></div></div>',
                parseTemplate : function (template, data) {
                    for (var i in data){
                        console.log(i);
                        if (data.hasOwnProperty(i)){
                            console.log(i);
                            console.log(data[i]);
                            template.split('{{' + i + '}}').join(data[i]);
                        }
                    }
                    return template;
                }
            };
        
		if (!!infobox) {
			infobox.close(self.map, this);
		}
        
		infobox = new InfoBox({
			content: overlay.parseTemplate(this.infoxBoxData),
			disableAutoPan: false,
			zIndex: null,
			maxWidth: 0,
			boxStyle: {
				width:'250px',
				opacity: 1
			},
            pixelOffset: new google.maps.Size(-115, -10),
            alignBottom: true,
			closeBoxMargin: '4px 4px 4px 4px',
			isHidden: false,
            closeBoxURL: settings.infobox.closeIcon,
            infoBoxClearance: new google.maps.Size(1, 1),
			pane: 'floatPane',
			enableEventPropagation: false
         });
		
		infobox.open(self.map, self);
		google.maps.event.addListener(self.map, 'click', function () {infobox.close(self.map, self); });
	
	};
	
	Map.prototype.placeMarkers = function() {
        var self = this;
        
		for (var i = 0; i < self.markers.length; ++i) {
			self.markers[i].setMap(self.map);
            self.spidifier.addMarker(self.markers[i]); 
		}
	};
	
    Map.prototype.initSpidifier = function() {
        var self = this,
            iw = new google.maps.InfoWindow();
        
        this.spidifier = new OverlappingMarkerSpiderfier(this.map, settings.spiderifier);
        
        this.spidifier.addListener('click', function(marker, event) {
            self.clickMarker.call(marker);
        });
        
    };
    
    
    Map.prototype.initClusters = function() {
        var markerCluster = new MarkerClusterer(this.map, this.markers, {
            maxZoom: settings.clusterer.maxZoom
        });
    };
    
	Map.prototype.setBoundary = function () {
		if (this.markers.length > 1) {
			this.map.fitBounds(this.boundary);
		} else {
			this.map.setCenter(this.boundary.getCenter());
			this.map.setZoom(this.zoom);
		}
		return this;
	};
	
	Map.prototype.drawMap = function() {
		 var self = this,
            mapOptions = {
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'ExovaMap']
				},
				scaleControl: false,
				mapTypeControl: false,
				overviewMapControl: true,
				panControl: false,
				rotateControl: false,
				streetViewControl: true,
                maxZoom: 16,
				zoomControl: true,
			 	styles : settings.map.styles
             };
		
		this.map = new google.maps.Map(settings.map.mapElement, mapOptions);
        
        this.initSpidifier();
        
		this.setBoundary();
		
		this.placeMarkers();
        
        this.initClusters();
		
		return self;
	};
	
	Map.prototype.refresh = function(locations, opts) {
		this.locations = locations;
		this.clearMarkers()
			.initMarkers()
			.setBoundary()
			.placeMarkers();
	};
	
	function init(locations, opts) {
        return new Map(locations, opts);
	}
	
	function asyncGoogleMapAPI(locations, opts) {
		var API = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places&callback=GoogleMapsAPILoaded',
			infobox = 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox.js',
            clusterer = 'https://google-maps-utility-library-v3.googlecode.com/svn-history/r287/trunk/markerclusterer/src/markerclusterer.js',
            spiderer = 'http://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js',
			GoogleMapsAPILoaded = function(p) {
                //Pyramid of doom/callback hell
        		appendScript(infobox, function(err) {
                    if(err) { 
                        console.log(err);
                    }
                    appendScript(clusterer, function(err) {
						if(err) { 
				            console.log(err);
						}
                        appendScript(spiderer, function(err) {
                            if(err) { 
                                console.log(err);
                            }
                            init(locations, opts);
                         });
					 });
                    
                });
			},
			appendScript = function(src, cb) {
				var script = document.createElement('script'),
					timer = window.setTimeout(function() {
						cb('Script ' + src + ' failed to load in time.');
					}, 5000);
				script.src = src;
				script.onload = function() {
					window.clearTimeout(timer);
					cb();
				};
        		document.body.appendChild(script);
			};
			
		window.GoogleMapsAPILoaded = GoogleMapsAPILoaded;
		
        appendScript(API, function(err) {
			if(err) {
				console.log(err);
			}
		});
	}
	
	return {
        asyncGoogleMapAPI: asyncGoogleMapAPI
    };
 }));