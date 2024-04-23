import _ from '@lodash';

const ClientTypeModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('clientType-'),
		name: ''
	});
export default ClientTypeModel;
