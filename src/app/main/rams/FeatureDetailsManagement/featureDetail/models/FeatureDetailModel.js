import _ from '@lodash';

const FeatureDetailModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('featureDetail-'),
		name: ''
	});
export default FeatureDetailModel;
