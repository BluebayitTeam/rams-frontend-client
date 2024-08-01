import _ from '@lodash';

const FingerModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default FingerModel;
