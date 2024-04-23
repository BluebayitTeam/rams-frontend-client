import _ from '@lodash';

const PackageTypeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('packageType-'),
		name: ''
	});
export default PackageTypeModel;
