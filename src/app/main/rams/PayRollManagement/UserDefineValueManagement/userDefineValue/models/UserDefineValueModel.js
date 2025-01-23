import _ from '@lodash';

const UserDefineValueModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('userDefineValue-'),
		name: '',

	});
export default UserDefineValueModel;
