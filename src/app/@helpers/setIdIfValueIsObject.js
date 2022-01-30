import _ from 'lodash';

const setIdIfValueIsObject = (object = {}) => {
	const conVertedObject = object;

	for (let x in conVertedObject) {
		if (x == 'created_by' || x == 'updated_by') delete conVertedObject[x];
		else if (_.isObject(conVertedObject[x])) conVertedObject[x] = conVertedObject[x]?.id;
	}

	return conVertedObject;
};

export default setIdIfValueIsObject;
