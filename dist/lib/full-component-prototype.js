export default {
    init(){
        this.map = new google.maps.Map(this.node, this.settings.map.options);
        this.boundary = new google.maps.LatLngBounds();
        this.markers = this.createMarkers();
        this.spidifier = this.settings.modules.spidifier ? this.initSpidifier() : false;
        this.attachMarkers();
        this.markerCluster = this.settings.modules.clusterer ? new MarkerClusterer(this.map, this.markers, this.settings.clusterer) : false;
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
        if(this.settings.modules.infobox) spidifier.addListener('click', marker => this.clickMarker.call(this, marker));
        return spidifier;
    },
    attachMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(this.map);
            if(this.settings.modules.spidifier) this.spidifier.addMarker(marker);
            else if(this.settings.modules.infobox) google.maps.event.addListener(marker, 'click', this.clickMarker.bind(this, marker));
        });
    },
    initListeners(){
        google.maps.event.addListener(this.map, 'idle', () => this.mapCentre = this.map.getCenter());
        google.maps.event.addDomListener(window, 'resize', () => this.map.setCenter(this.mapCentre));
    },
    clickMarker(marker) {
        if (this.activeMarker && this.activeMarker === marker) {
            this.closeInfobox(this.activeMarker);
            return;
        }
        this.openInfobox(marker);
    },
    closeInfobox(marker){
        marker.infobox && marker.infobox.close(marker.map, marker);
        this.activeMarker = null;
    },
    openInfobox(marker){
        if (this.activeMarker) this.closeInfobox(this.activeMarker);
        this.activeMarker = marker;
        
        marker.infobox = this.createInfobox(marker);
        marker.infobox.open(marker.map, marker);
        google.maps.event.addListener(marker.map, 'click', () => { this.closeInfobox(marker); });
    },
    createInfobox(marker){
        let render = (template, data) => {
            for (var i in data){
                if (data.hasOwnProperty(i)) template = template.split('{{' + i + '}}').join(data[i]);
            }
            return template;
        };

        return new InfoBox({
            content: render(this.settings.infobox.template, marker.infoBoxData),
            disableAutoPan: false,
            zIndex: null,
            maxWidth: 0,
            boxStyle: this.settings.infobox.boxStyle,
            pixelOffset: new google.maps.Size(this.settings.infobox.pixelOffset[0], this.settings.infobox.pixelOffset[1]),
            alignBottom: true,
            closeBoxMargin: '4px 4px 4px 4px',
            isHidden: false,
            closeBoxURL: this.settings.infobox.closeIcon,
            infoBoxClearance: new google.maps.Size(1, 1),
            pane: 'floatPane',
            enableEventPropagation: false
        });
    }
};