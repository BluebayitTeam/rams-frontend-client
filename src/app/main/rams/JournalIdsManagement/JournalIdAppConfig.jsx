import { Navigate } from 'react-router-dom';
import JournalIDApp from './JournalIDApp';
import JournalIDs from './journalIDs/JournalIDs';
import JournalID from './journalID/JournalID';

/**
 * The E-Commerce app configuration.
 */
const JournalIDAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/journalID',
			element: <JournalIDApp />,
			children: [
				{
					path: '',
					element: <Navigate to="journalIDs" />
				},
				{
					path: 'journalIDs',
					element: <JournalIDs />
				},
				{
					path: 'journalIDs/:journalIDId/:invoice_no?',
					element: <JournalID />
				}
			]
		}
	]
};
export default JournalIDAppConfig;
