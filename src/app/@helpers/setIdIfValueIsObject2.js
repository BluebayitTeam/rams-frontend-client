import _ from 'lodash';

const setIdIfValueIsObject2 = object => {
	const conVertedObject = object;

	try {
		for (let x in conVertedObject) {
			if (_.isObject(conVertedObject[x])) {
				conVertedObject[x] = conVertedObject[x]?.id;
			}
		}
	} catch (err) {
		console.log({ err });
	}

	console.log('conVertedObject', conVertedObject);

	return conVertedObject;
};

export default setIdIfValueIsObject2;
