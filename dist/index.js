/**
 * @name storm-google-map: Google Maps API loader and abstraction layer with spidering, clustering and custom infobox
 * @version 1.1.0: Fri, 26 May 2017 13:47:52 GMT
 * @author stormid
 * @license MIT
 */
import Load from 'storm-load';
import { full as defaults} from './lib/defaults';
import libs from './lib/libs';
import componentPrototype from './lib/lite-component-prototype';

const run = () => delete window.$__GMAPILoaded__$;

const init = (sel, locations, opts) => {
	let el = document.querySelector(sel),
		APIPath = libs.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

	if(!el) throw new Error('No DOM element supplied to contain map');
	
	window.$__GMAPILoaded__$ = run;

	let settings =  Object.assign({}, defaults, opts);
	
	return Load([APIPath])
			.then(() => Load(['infobox', 'clusterer', 'spidifier'].filter(module => settings.modules[module] === true).map(module => libs[module.toUpperCase()]))
							.then(() => Object.assign(Object.create(componentPrototype), {
								settings: settings,
								node: el,
								locations: locations
							}).init()))
			.catch(e => console.log(`Script loading error: ${e.message}`));
};

export default { init };