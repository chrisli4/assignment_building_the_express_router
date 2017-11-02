
const Parser = {};

Parser.parse = (path) => {
	let names = [];
	let params = [];
	let matches = path.split('/');

	matches.forEach((match) => {
		if(match[0] === ':') {
			params.push(match.slice(1));
			names.push('([^/]+)');
		} else {
			names.push(match);
		}
	});

	let pattern = names.join('/');

	return {
		pattern: pattern,
		names: params
	};
};

Parser.match = (routes, path) => {
	let pattern, names, values;
	let patterns = Object.keys(routes);

	for(i = 0; i < patterns.length; i++) {
		const regex = new RegExp(patterns[i], 'gi');

		const match = regex.exec(path);

		if(match && (match[0] === path)) {
			 pattern = patterns[i];
			 names = routes[pattern].names;
			 values = match.slice(1);
			 break;
		}
	}

	return {
		pattern: pattern,
		names: names,
		values: values
	};
};


module.exports = Parser;
