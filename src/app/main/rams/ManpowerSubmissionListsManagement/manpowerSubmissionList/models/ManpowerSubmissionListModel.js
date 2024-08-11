import _ from '@lodash';

const ManpowerSubmissionListModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('manpowerSubmissionList-'),
		name: ''
	});
export default ManpowerSubmissionListModel;
