import _ from '@lodash';

const PromotionConditionModel = (data) =>
	_.defaults(data || {}, {
		// id: _.uniqueId('promotionConditions-'),
		name: '',

	});
export default PromotionConditionModel;
