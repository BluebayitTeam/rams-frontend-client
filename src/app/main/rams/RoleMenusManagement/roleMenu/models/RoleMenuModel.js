import _ from '@lodash';

const RoleMenuModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('roleMenu-'),
		name: ''
	});
export default RoleMenuModel;
