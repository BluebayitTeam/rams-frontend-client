import _ from '@lodash';

const QualificationModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('qualification-'),
		name: ''
	});
export default QualificationModel;
