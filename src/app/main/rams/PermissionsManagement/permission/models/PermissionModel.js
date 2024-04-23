import _ from '@lodash';

const DepartmentModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('permission-'),
		name: ''
	});
export default DepartmentModel;
