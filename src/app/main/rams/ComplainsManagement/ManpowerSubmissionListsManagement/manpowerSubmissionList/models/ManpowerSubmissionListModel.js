import _ from '@lodash';

const ManpowerSubmissionListModel = (data) =>
	_.defaults(data || {}, {
		agency: '',
		country: '',
		passenger: '',
		man_power_date: ''
	});
export default ManpowerSubmissionListModel;
