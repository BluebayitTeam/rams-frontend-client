import _ from '@lodash';

const ThailandVisaModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default ThailandVisaModel;
