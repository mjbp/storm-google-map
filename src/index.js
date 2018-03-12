import Load from 'storm-load';
import defaults from './lib/defaults';
import { libs } from './lib/constants';
import factory from './lib';

const run = () => delete window.$__GMAPILoaded__$;

const init = (sel, locations, opts) => {
	let el = document.querySelector(sel),
		APIPath = libs.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

	if(!el) return console.warn(`Element could not be found with selector '${sel}'`);
	
	window.$__GMAPILoaded__$ = run;

	let settings =  Object.assign({}, defaults, opts);
	
	return Load([APIPath])
			.then(() => Load(['infobox', 'clusterer', 'spiderifier']
						.filter(module => settings.modules[module])
						.map(module => libs[module.toUpperCase()]))
							.then(() => Object.create(factory(el, locations, Object.assign({}, defaults, opts)))
						)
				)
			.catch(e => console.log(`Script loading error: ${e.message}`));
};

export default { init };