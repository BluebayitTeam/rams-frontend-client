import _ from '@lodash';

const GroupModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('group-'),
		name: ''
	});
export default GroupModel;
