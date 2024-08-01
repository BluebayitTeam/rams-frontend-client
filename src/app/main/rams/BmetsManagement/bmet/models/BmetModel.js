import _ from '@lodash';

const BmetModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default BmetModel;
