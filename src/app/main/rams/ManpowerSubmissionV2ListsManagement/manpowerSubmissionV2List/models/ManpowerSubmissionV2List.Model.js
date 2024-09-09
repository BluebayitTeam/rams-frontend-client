import _ from '@lodash';

const ManpowerSubmissionV2List = (data) =>
	_.defaults(data || {}, {
		agency: '',
		country: '',
		passenger: '',
		man_power_date: ''
	});
export default ManpowerSubmissionV2List;
