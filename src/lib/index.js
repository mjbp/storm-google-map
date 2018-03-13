import { plotMarkers, drawMarkers, initHandlers } from './markers';
let state = {};

/*

clearMarkers(){
        this.markers.forEach(marker => {
            marker.setMap(null);
            google.maps.event.addListener(marker, 'click', this.clickMarker.bind(this, marker));
        });
        this.spiderifier = null;
        this.markerCluster.clearMarkers();
        this.boundary = null;
    },



    google.maps.event.addListener(this.map, 'idle', () => {
            if(this.locations.length === 0) this.map.setCenter(new google.maps.LatLng(this.settings.defaultCenter.lat, this.settings.defaultCenter.lng));
            this.mapCentre = this.map.getCenter();
        });
        google.maps.event.addDomListener(window, 'resize', () => this.map.setCenter(this.mapCentre));

refresh(locations){
        this.clearMarkers();
        this.locations = locations;
        this.initMarkers();
    },

    */
export default (node, locations = [], settings) => {
    state = Object.assign({}, {
                map: new google.maps.Map(node, Object.assign({}, settings.mapOptions, { styles: settings.styles }))
            },
            { settings },
            plotMarkers(settings, locations, new google.maps.LatLngBounds())
        );

    state.map.fitBounds(state.boundary);
    drawMarkers(state);
    
    settings.modules.infobox && initHandlers(state);
    if(settings.modules.clusterer) state = Object.assign({}, state, {
        clusterer: new MarkerClusterer(state.map, state.markers, settings.clusterer)
    });
    
    console.log(state)
    return state
};