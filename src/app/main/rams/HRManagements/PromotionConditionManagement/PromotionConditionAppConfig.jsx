import { Navigate } from 'react-router-dom';
import PromotionCondition from './promotionCondition/PromotionCondition';
import PromotionConditionApp from './PromotionConditionApp';
import PromotionConditions from './promotionConditions/PromotionConditions';

/**
 * The E-Commerce app configuration.
 */

// apps/promotionCondition/promotionConditions

const PromotionConditionAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/promotionCondition',
			element: <PromotionConditionApp />,
			children: [
				{
					path: '',
					element: <Navigate to="promotionConditions" />
				},
				{
					path: 'promotionConditions',
					element: <PromotionConditions />
				},
				{
					path: 'promotionConditions/:promotionConditionId/*',
					element: <PromotionCondition />
				}
			]
		}
	]
};
export default PromotionConditionAppConfig;
