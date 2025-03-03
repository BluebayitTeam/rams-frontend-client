import _ from '@lodash';

const DepartmentModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('department-'),
		name: '',
		
	});
export default DepartmentModel;
