import _ from '@lodash';

const RoleModel = (data) =>
	_.defaults(data || {}, {
		name: ''
	});
export default RoleModel;
