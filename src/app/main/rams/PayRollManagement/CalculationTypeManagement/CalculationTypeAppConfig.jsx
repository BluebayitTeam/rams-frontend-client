import { Navigate } from 'react-router-dom';
import CalculationType from './calculationType/CalculationType';
import CalculationTypeApp from './CalculationTypeApp';
import CalculationTypes from './calculationTypes/CalculationTypes';

/**
 * The E-Commerce app configuration.
 */

// apps/calculationType/calculationTypes

const CalculationTypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/calculationType',
			element: <CalculationTypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="calculationTypes" />
				},
				{
					path: 'calculationTypes',
					element: <CalculationTypes />
				},
				{
					path: 'calculationTypes/:calculationTypeId/*',
					element: <CalculationType />
				}
			]
		}
	]
};
export default CalculationTypeAppConfig;
