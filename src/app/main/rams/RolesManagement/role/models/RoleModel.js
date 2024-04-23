import _ from '@lodash';

const RoleModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('role-'),
		name: ''
	});
export default RoleModel;
