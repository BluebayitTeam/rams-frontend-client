import { Navigate } from 'react-router-dom';
import ManpowerNoteSheetApp from './ManpowerNoteSheetApp';
import ManpowerNoteSheet from './manpowerNoteSheet/ManpowerNoteSheet';

const ManpowerNoteSheetAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/manpowerNoteSheet',
			element: <ManpowerNoteSheetApp />,
			children: [
				{
					path: '',
					element: <Navigate to="manpowerNoteSheets" />
				},

				{
					path: 'manpowerNoteSheets/:manpowerNoteSheetId?/*',
					element: <ManpowerNoteSheet />
				}
			]
		}
	]
};
export default ManpowerNoteSheetAppConfig;
