import _ from '@lodash';

const AuthorizeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('authorize-'),
		name: ''
	});
export default AuthorizeModel;
