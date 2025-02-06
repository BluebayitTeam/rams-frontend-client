import _ from '@lodash';

const JobCategoryModel = (data) =>
	_.defaults(data || {}, {
		// id: _.uniqueId('jobCategorys-'),
		name: '',

	});
export default JobCategoryModel;
