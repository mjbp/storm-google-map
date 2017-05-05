import Load from 'storm-load';

const onDOMContentLoadedTasks = [() => {

	Load('./js/storm-google-map-index.standalone.js')
		.then(() => {
			StormGoogleMap.init('#js-map', [
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
				}])
				.then(res => {
					console.log(res);
				});
		});

	/*
	GoogleMap.init('#js-map', [
		{
			id: 'Storm',
			title: 'StormId',
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
		}])
		.then(res => {
			console.log(res);
		});
		*/
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });