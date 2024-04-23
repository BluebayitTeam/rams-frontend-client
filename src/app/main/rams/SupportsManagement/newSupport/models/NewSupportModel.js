import _ from '@lodash';

const NewSupportModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('support-'),
		name: ''
	});
export default NewSupportModel;
