import _ from '@lodash';

const CvBankModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('agent-')
	});
export default CvBankModel;
