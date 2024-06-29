import { Navigate } from 'react-router-dom';
import JournalApp from './JournalApp';
import Journals from './journals/Journals';
import Journal from './journal/Journal';

/**
 * The E-Commerce app configuration.
 */
const JournalAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/journal',
			element: <JournalApp />,
			children: [
				{
					path: '',
					element: <Navigate to="journals" />
				},
				{
					path: 'journals',
					element: <Journals />
				},
				{
					path: 'journals/:journalId/:invoice_no?',
					element: <Journal />
				}
			]
		}
	]
};
export default JournalAppConfig;
