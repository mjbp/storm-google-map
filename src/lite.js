import Load from 'storm-load';
import { lite as defaults} from './lib/defaults';
import libs from './lib/libs';
import componentPrototype from './lib/lite-component-prototype';

const run = () => delete window.$__GMAPILoaded__$;

const init = (sel, locations, opts) => {
	let el = document.querySelector(sel),
		APIPath = libs.GMAPI + (!opts || !opts.key ? '' : '&key=' + opts.key);

	if(!el) throw new Error('No DOM element supplied to contain map');
    
	window.$__GMAPILoaded__$ = run;

	let settings = Object.assign({}, defaults, opts);
	
	return Load([APIPath])
		.then(() => Object.assign(Object.create(componentPrototype), {
				settings: settings,
				node: el,
				locations: locations
			}).init())
		.catch(e => console.log(`Script loading error: ${e.message}`));
};

export default { init };