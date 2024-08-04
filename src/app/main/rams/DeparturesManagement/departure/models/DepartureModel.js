import _ from '@lodash';

const DepartureModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default DepartureModel;
