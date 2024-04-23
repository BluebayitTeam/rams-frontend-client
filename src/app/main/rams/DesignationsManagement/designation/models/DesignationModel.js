import _ from '@lodash';

const DesignationModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('designation-'),
		name: ''
	});
export default DesignationModel;
