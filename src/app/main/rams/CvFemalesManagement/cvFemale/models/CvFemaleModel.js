import _ from '@lodash';

const CvFemaleModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('agent-')
	});
export default CvFemaleModel;
