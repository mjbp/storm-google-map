(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.StormGoogleMap = factory());
}(this, (function () { 'use strict';

/**
 * @name storm-load: Lightweight promise-based script loader
 * @version 0.4.0: Fri, 20 Jan 2017 16:57:34 GMT
 * @author stormid
 * @license MIT
 */
const create = url => {
	return new Promise((resolve, reject) => {
		let s = document.createElement('script');
		s.src = url;
		s.onload = s.onreadystatechange = function() {
			if (!this.readyState || this.readyState === 'complete') resolve();
		};
		s.onerror = s.onabort = reject;
		document.head.appendChild(s);
	});
};

const synchronous = urls => {
	return new Promise((resolve, reject) => {
		let next = () => {
			if (!urls.length) return resolve();
			create(urls.shift()).then(next).catch(reject);
		};
		next();
	});
};

var Load = (urls, async = true) => {
	urls = [].concat(urls);
	if (!async) return synchronous(urls);

	return Promise.all(urls.map(url => create(url)));
};

const CONSTANTS = {
		GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$',
		INFOBOX: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/a2cdc955fcd20d47db28db645e63f0d2054070c9/1.1.9/src/infobox_packed.js',
		CLUSTERER: 'https://cdn.rawgit.com/googlemaps/v3-utility-library/df501fcbc3e7513d6a94718ab6673de47c202255/1.0.2/src/markerclusterer_compiled.js',
		SPIDIFIER: 'https://jawj.github.io/OverlappingMarkerSpiderfier/bin/oms.min.js'
	};
const defaults = {
		key: null,
		modules: {
			infobox: true,
			clusterer: true,
			spidifier: true
		},
		map : {
			options : {
				scaleControl: false,
				scrollwheel: false,
				mapTypeControl: false,
				overviewMapControl: true,
				panControl: false,
				rotateControl: false,
				streetViewControl: true,
				maxZoom: 16,
				zoomControl: true,
				styles : [
                    {stylers: [{visibility: 'on'}, {saturation: -100, hue: '#000000' }]},
                    {featureType: 'road.local', stylers: [{ visibility: 'simplified' }]},
                    {featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }]},
                    {featureType: 'landscape.man_made', stylers: [{ visibility: 'on' }]},
                    {featureType: 'transit', stylers: [{ visibility: 'on' }]}
				]
			},
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
			template: '<div class="infobox"><div class="infobox-inner" id="infobox"><h1 class="infobox-heading">{{title}}</h1></div></div>',
			closeIcon : 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20fill%3D%22%23FFFFFF%22%20height%3D%2218%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2218%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
			urlBase: '/',
			boxStyle: {
				width:'250px',
				opacity: 1
			},
			pixelOffset: [-115, -10]
		}
	};
const StormGoogleMap = {
		init(){
			this.isReady = false;

			this.map = new google.maps.Map(element, this.settings.map.options);
			this.boundary = new google.maps.LatLngBounds();

			this.locations = locations;
			this.element = element;
			this.markers = this.createMarkers();
			
			this.spidifier = settings.modules.spidifier ? this.initSpidifier() : false;
			
			this.attachMarkers();

			this.markerCluster = settings.modules.clusterer ? new MarkerClusterer(this.map, this.markers, this.settings.clusterer) : false;
			
			this.map.fitBounds(this.boundary);

			this.initListeners();
			
			return this;
		},
		createMarkers(){
			return this.locations.map(marker => {
				let latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng);

				this.boundary.extend(latLng);
				
				return new google.maps.Marker({
					position: latLng,
					clickable: this.settings.modules.infobox,
					infoBoxData : marker,
					icon: {
						url: this.settings.map.markerIcon,
						scaledSize: new google.maps.Size(24,24)
					},
					optimized: false,
				});
			});
            
		},
		initSpidifier() {
			let spidifier = new OverlappingMarkerSpiderfier(this.map, this.settings.spiderifier);
			if(this.settings.modules.infobox) spidifier.addListener('click', marker => this.clickMarker.call(marker));
			return spidifier;
		},
		attachMarkers() {
			this.markers.forEach(marker => {
				marker.setMap(this.map);
				if(this.settings.modules.spidifier) this.spidifier.addMarker(marker);
				else if(this.settings.modules.infobox) google.maps.event.addListener(marker, 'click', this.clickMarker);
			});
		},
		initListeners(){
			google.maps.event.addListenerOnce(this.map, 'idle', () => this.isReady = true);
			google.maps.event.addListener(this.map, 'idle', () => this.mapCentre = this.map.getCenter());
			google.maps.event.addDomListener(window, 'resize', () => this.map.setCenter(this.mapCentre));
		},
		clickMarker() {
			let render = (template, data) => {
				for (var i in data){
					if (data.hasOwnProperty(i)) template = template.split('{{' + i + '}}').join(data[i]);
				}
				return template;
			};
            
			if (this.infobox) this.infobox.close(self.map, this);
			
			this.infobox = new InfoBox({
				content: render(settings.infobox.template, this.infoBoxData),
				disableAutoPan: false,
				zIndex: null,
				maxWidth: 0,
				boxStyle: settings.infobox.boxStyle,
				pixelOffset: new google.maps.Size(settings.infobox.pixelOffset[0], settings.infobox.pixelOffset[1]),
				alignBottom: true,
				closeBoxMargin: '4px 4px 4px 4px',
				isHidden: false,
				closeBoxURL: settings.infobox.closeIcon,
				infoBoxClearance: new google.maps.Size(1, 1),
				pane: 'floatPane',
				enableEventPropagation: false
			});
			this.infobox.open(this.map, this);
			google.maps.event.addListener(this.map, 'click', function () {this.infobox.close(this.map); }.bind(this));
        
		}/*,
		clearMarkers() {
            if (this.markers.length > 0) {
                this.markers.forEach(function(marker){
                    marker.setMap(null);
                });
                this.markers.length = 0;
                this.spidifier.clearMarkers(); 
            }
        }*/
	};

let settings = {};
let locations = [];
let element = false;

const run = () => delete window.$__GMAPILoaded__$;

const init = (sel, locs, opts) => {
	let el = document.querySelector(sel),
		APIPath = CONSTANTS.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

	if(!el) throw new Error('No DOM element supplied to contain map');
    
	settings = Object.assign({}, defaults, opts);
	locations = locs;
	element = el;
	window.$__GMAPILoaded__$ = run;
	
	return Load([APIPath])
		.then(() => {
			let dependencies = ['infobox', 'clusterer', 'spidifier'].filter(module => settings.modules[module] === true).map(module => CONSTANTS[module.toUpperCase()]);
				
			return Load(dependencies)
				.then(() => { 
					return Object.assign(Object.create(StormGoogleMap), {
						settings: Object.assign({}, defaults, settings)
					}).init();
				})
				.catch((e) => console.log(`Script loading error: ${e.message}`));
		})
	.catch(e => console.log(`Script loading error: ${e.message}`));
};

var stormGoogleMap = { init };

return stormGoogleMap;

})));
