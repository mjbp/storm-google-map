export default {
    init(){
        this.isReady = false;

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