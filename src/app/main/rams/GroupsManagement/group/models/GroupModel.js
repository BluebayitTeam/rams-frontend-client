import _ from '@lodash';

const GroupModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('group-'),
		name: null,
		head_group: null,
	});
export default GroupModel;
