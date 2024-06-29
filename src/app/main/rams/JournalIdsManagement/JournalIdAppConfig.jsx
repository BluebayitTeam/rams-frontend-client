import { Navigate } from 'react-router-dom';
import JournalIdApp from './JournalIdApp';
import JournalIds from './journalIds/JournalIds';
import JournalId from './journalId/JournalId';

/**
 * The E-Commerce app configuration.
 */
const JournalIdAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/journalId',
			element: <JournalIdApp />,
			children: [
				{
					path: '',
					element: <Navigate to="journalIds" />
				},
				{
					path: 'journalIds',
					element: <JournalIds />
				},
				{
					path: 'journalIds/:journalId/:invoice_no?',
					element: <JournalId />
				}
			]
		}
	]
};
export default JournalIdAppConfig;
