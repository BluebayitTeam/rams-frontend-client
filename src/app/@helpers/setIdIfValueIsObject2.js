import _ from 'lodash';

const setIdIfValueIsObject2 = object => {
	const conVertedObject = JSON.parse(JSON.stringify(object));

	try {
		for (let x in conVertedObject) {
			if (_.isObject(conVertedObject[x])) {
				conVertedObject[x] = conVertedObject[x]?.id;
			}
		}
	} catch (err) {
		console.log(`clicked`);
	}

	return conVertedObject;
};

export default setIdIfValueIsObject2;
