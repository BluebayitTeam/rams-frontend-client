import _ from '@lodash';

const BmetApplicationModel = (data) =>
	_.defaults(data || {}, {
		agency:'',
		man_power_date: '',
		gender: ''
	});
export default BmetApplicationModel;
