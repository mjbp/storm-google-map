import should from 'should';
import Map from '../dist/storm-google-map.standalone';
import 'jsdom-global/register';

const html = `<div class="js-map"></div>`;

document.body.innerHTML = html;

let MapItem;

describe('Initialisation promise', () => {
	
});

describe('Initialisation return object', () => {

	Map.init('.js-map')
		.then(res => {
			MapItem = res;
			
			it('should resolve Map abstraction object', () => {
				should(MapItem)
				.Object();
			});

		});
	
});