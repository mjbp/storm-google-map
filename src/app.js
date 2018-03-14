import Load from 'storm-load';

const onDOMContentLoadedTasks = [() => {

	Load('./js/storm-google-map.standalone.js')
		.then(() => {
			StormGoogleMap
				.init('#js-map', [
					{
						id: 'Storm',
						title: 'Storm Id',
						location : { 
							lat: 55.9749013,
							lng: -3.1669848
						}
					},
					{
						id: 'Waverley',
						title: 'Waverley Station',
						location : {
							lat: 55.9519979,
							lng: -3.1899702
						}
					
				}], { moduleBasePath: './js/' })
				.then(res => {
					console.log(res);
					window.__SGM__ = res;
				});
		});
}];
    
{ onDOMContentLoadedTasks.forEach((fn) => fn()); };


/*

function initMap() {
  var pointA = new google.maps.LatLng(51.7519, -1.2578),
    pointB = new google.maps.LatLng(50.8429, -0.1313),
    myOptions = {
      zoom: 7,
      center: pointA
    },
    map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
    // Instantiate a directions service.
    directionsService = new google.maps.DirectionsService,
    directionsDisplay = new google.maps.DirectionsRenderer({
      map: map
    }),
    markerA = new google.maps.Marker({
      position: pointA,
      title: "point A",
      label: "A",
      map: map
    }),
    markerB = new google.maps.Marker({
      position: pointB,
      title: "point B",
      label: "B",
      map: map
    });

  // get route from A to B
  calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

}



function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
  directionsService.route({
    origin: pointA,
    destination: pointB,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

initMap();

*/