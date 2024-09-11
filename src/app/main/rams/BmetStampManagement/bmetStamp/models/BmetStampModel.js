import _ from '@lodash';

const BmetApplicationModel = (data) =>
	_.defaults(data || {}, {
		man_power_date: '',
		gender: ''
	});
export default BmetApplicationModel;
