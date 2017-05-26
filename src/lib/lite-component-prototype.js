export default {
    init(){
        this.map = new google.maps.Map(this.node, this.settings.map.options);
        this.boundary = new google.maps.LatLngBounds();
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
        google.maps.event.addListener(this.map, 'idle', () => this.mapCentre = this.map.getCenter());
        google.maps.event.addDomListener(window, 'resize', () => this.map.setCenter(this.mapCentre));
    }
};