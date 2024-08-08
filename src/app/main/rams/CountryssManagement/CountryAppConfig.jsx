import { Navigate } from 'react-router-dom';
import CountryApp from './CountryApp';
import Countrys from './countrys/Countrys';
import Country from './country/Country';

/**
 * The E-Commerce app configuration.
 */
const CountryAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/country',
			element: <CountryApp />,
			children: [
				{
					path: '',
					element: <Navigate to="countrys" />
				},
				{
					path: 'countrys',
					element: <Countrys />
				},
				{
					path: 'countrys/:countryId/*',
					element: <Country />
				}
			]
		}
	]
};
export default CountryAppConfig;
