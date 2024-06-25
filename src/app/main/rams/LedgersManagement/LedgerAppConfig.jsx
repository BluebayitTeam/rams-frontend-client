import { Navigate } from 'react-router-dom';
import LedgerApp from './LedgerApp';
import Ledgers from './ledgers/Ledgers';
import Ledger from './ledger/Ledger';

/**
 * The E-Commerce app configuration.
 */
const LedgerAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/ledger',
			element: <LedgerApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ledgers" />
				},
				{
					path: 'ledgers',
					element: <Ledgers />
				},
				{
					path: 'ledgers/:ledgerId/*',
					element: <Ledger />
				}
			]
		}
	]
};
export default LedgerAppConfig;
