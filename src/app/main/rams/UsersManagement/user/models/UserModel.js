import _ from '@lodash';

const UserModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('user-'),
		first_name: ''
	});
export default UserModel;
