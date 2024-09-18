import _ from '@lodash';

const VisaSubmissionListModel = (data) =>
	_.defaults(data || {}, {
		
		passenger: '',
	
	});
export default VisaSubmissionListModel;
