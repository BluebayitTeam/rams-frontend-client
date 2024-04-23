import _ from 'lodash';

const setIdIfValueIsObject = object => {
	let conVertedObject = JSON.parse(JSON.stringify(object));

	try {
		for (let x in conVertedObject) {
			if (x == 'created_by' || x == 'updated_by') delete conVertedObject[x];
			else if (_.isObject(conVertedObject[x])) conVertedObject[x] = conVertedObject[x]?.id;
		}
	} catch (err) {
		console.log('error');
	}

	return conVertedObject;
};

export default setIdIfValueIsObject;
