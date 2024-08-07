import { Navigate } from 'react-router-dom';
import CurrencyApp from './CurrencyApp';
import Currencys from './currencys/Currencys';
import Currency from './currency/Currency';

/**
 * The E-Commerce app configuration.
 */
const CurrencyAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/currency',
			element: <CurrencyApp />,
			children: [
				{
					path: '',
					element: <Navigate to="currencys" />
				},
				{
					path: 'currencys',
					element: <Currencys />
				},
				{
					path: 'currencys/:currencyId/*',
					element: <Currency />
				}
			]
		}
	]
};
export default CurrencyAppConfig;
