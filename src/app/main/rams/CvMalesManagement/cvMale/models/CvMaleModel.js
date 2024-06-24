import _ from '@lodash';

const CvMaleModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('agent-')
	});
export default CvMaleModel;
