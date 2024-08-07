import _ from '@lodash';

const CurrentStatusModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('currentStatus-'),
		name: ''
	});
export default CurrentStatusModel;
