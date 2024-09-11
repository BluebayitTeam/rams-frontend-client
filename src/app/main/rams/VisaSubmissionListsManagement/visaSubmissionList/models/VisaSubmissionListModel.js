import _ from '@lodash';

const VisaSubmissionListModel = (data) =>
	_.defaults(data || {}, {
		agency: '',
		country: '',
		passenger: '',
		man_power_date: ''
	});
export default VisaSubmissionListModel;
