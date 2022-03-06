import _ from 'lodash';

const setIdIfValueIsObjArryData = (array = []) => {
	let conVertedArray = JSON.parse(JSON.stringify(array));

	try {
		if (_.isArray(conVertedArray)) {
			const modidiedArr = [];
			conVertedArray.map(data => {
				let modifiedObj = data;
				for (let x in modifiedObj) {
					if (_.isObject(modifiedObj[x])) {
						modifiedObj[x] = modifiedObj[x]?.id;
					}
				}
				modidiedArr.push(modifiedObj);
			});
			conVertedArray = modidiedArr;
		}
	} catch (err) {
		console.log({ err });
	}

	console.log('conVertedArray', conVertedArray);

	return conVertedArray;
};

export default setIdIfValueIsObjArryData;
