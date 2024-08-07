import _ from '@lodash';

const DistrictModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('district-'),
		name: ''
	});
export default DistrictModel;
