import _ from '@lodash';

const PermissionModel = (data) =>
	_.defaults(data || {}, {
		name: ''
	});
export default PermissionModel;
