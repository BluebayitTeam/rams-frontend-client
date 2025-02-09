import _ from '@lodash';

const PromotionModel = (data) =>
	_.defaults(data || {}, {
		// id: _.uniqueId('promotions-'),
		name: '',

	});
export default PromotionModel;
