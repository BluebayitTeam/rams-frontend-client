import _ from '@lodash';

const MakeAListsManagementModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('department-'),
		name: ''
	});
export default MakeAListsManagementModel;
