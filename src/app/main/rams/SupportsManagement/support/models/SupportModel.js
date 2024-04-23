import _ from '@lodash';

const SupportModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('support-'),
		name: ''
	});
export default SupportModel;
