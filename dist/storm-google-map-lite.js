/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and infobox
 * @version 0.1.2: Fri, 20 Jan 2017 16:42:50 GMT
 * @author stormid
 * @license MIT
 */
import Load from 'storm-load';

const CONSTANTS = {
		GMAPI: 'http://maps.googleapis.com/maps/api/js?callback=$__GMAPILoaded__$'
	},
	defaults = {
		key: null,
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
	},
	StormGoogleMap = {
		init(){
			this.isReady = false;

			this.map = new google.maps.Map(element, this.settings.map.options);
			this.boundary = new google.maps.LatLngBounds();

			this.locations = locations;
			this.element = element;
			this.markers = this.createMarkers();
			
			this.attachMarkers();
			
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
					clickable: false,
					icon: {
						url: this.settings.map.markerIcon,
						scaledSize: new google.maps.Size(24,24)
					},
					optimized: false,
				});
			});
            
		},
		attachMarkers() {
			this.markers.forEach(marker => marker.setMap(this.map));
		},
		initListeners(){
			google.maps.event.addListenerOnce(this.map, 'idle', () => this.isReady = true);
			google.maps.event.addListener(this.map, 'idle', () => this.mapCentre = this.map.getCenter());
			google.maps.event.addDomListener(window, 'resize', () => this.map.setCenter(this.mapCentre));
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

let settings = {},
	locations = [],
	element = false;

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
			return Object.assign(Object.create(StormGoogleMap), {
				settings: settings
			}).init();
		})
		.catch(e => console.log(`Script loading error: ${e.message}`));
};

export default { init };