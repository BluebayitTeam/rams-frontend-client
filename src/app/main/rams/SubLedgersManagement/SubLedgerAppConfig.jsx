import { Navigate } from 'react-router-dom';
import SubLedgerApp from './SubLedgerApp';
import SubLedgers from './subLedgers/SubLedgers';
import SubLedger from './subLedger/SubLedger';

/**
 * The E-Commerce app configuration.
 */
const SubLedgerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/subLedger',
			element: <SubLedgerApp />,
			children: [
				{
					path: '',
					element: <Navigate to="subLedgers" />
				},
				{
					path: 'subLedgers',
					element: <SubLedgers />
				},
				{
					path: 'subLedgers/:subLedgerId/*',
					element: <SubLedger />
				}
			]
		}
	]
};
export default SubLedgerAppConfig;
