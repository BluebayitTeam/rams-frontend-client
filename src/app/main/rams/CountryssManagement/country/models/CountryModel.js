import _ from '@lodash';

const CountryModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('country-'),
		name: ''
	});
export default CountryModel;
