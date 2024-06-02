import _ from '@lodash';

const DemandAssignModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default DemandAssignModel;
