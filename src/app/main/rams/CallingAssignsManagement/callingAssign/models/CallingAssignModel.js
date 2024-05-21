import _ from '@lodash';

const CallingAssignModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default CallingAssignModel;
