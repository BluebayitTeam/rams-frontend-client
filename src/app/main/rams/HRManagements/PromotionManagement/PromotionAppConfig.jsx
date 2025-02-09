import { Navigate } from 'react-router-dom';
import PromotionApp from './PromotionApp';
import Promotions from './promotions/Promotions';

/**
 * The E-Commerce app configuration.
 */

// apps/promotion/promotions

const PromotionAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/promotion',
			element: <PromotionApp />,
			children: [
				{
					path: '',
					element: <Navigate to="promotions" />
				},
				{
					path: 'promotions',
					element: <Promotions />
				},
				// {
				// 	path: 'promotions/:promotionId/*',
				// 	element: <Promotion />
				// }
			]
		}
	]
};
export default PromotionAppConfig;
