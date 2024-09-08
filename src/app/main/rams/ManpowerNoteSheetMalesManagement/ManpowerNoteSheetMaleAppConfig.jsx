import { Navigate } from 'react-router-dom';
import ManpowerNoteSheetMaleApp from './ManpowerNoteSheetMaleApp';
import ManpowerNoteSheetMale from './manpowerNoteSheetMale/ManpowerNoteSheetMale';

/**
 * The E-Commerce app configuration.
 */
const ManpowerNoteSheetMaleAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/manpowerNoteSheetMale',
			element: <ManpowerNoteSheetMaleApp />,
			children: [
				{
					path: '',
					element: <Navigate to="manpowerNoteSheetMales" />
				},

				{
					path: 'manpowerNoteSheetMales/:manpowerNoteSheetMaleId?/*',
					element: <ManpowerNoteSheetMale />
				}
			]
		}
	]
};
export default ManpowerNoteSheetMaleAppConfig;
