import { Navigate } from 'react-router-dom';
import ListOfManpowerRefApp from './ListOfManpowerRefApp';
import ListOfManpowerRef from './listOfManpowerRef/ListOfManpowerRef';

const ListOfManpowerRefAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/listOfManpowerRef',
			element: <ListOfManpowerRefApp />,
			children: [
				{
					path: '',
					element: <Navigate to="listOfManpowerRefs" />
				},

				{
					path: 'listOfManpowerRefs/:listOfManpowerRefId?/*',
					element: <ListOfManpowerRef />
				}
			]
		}
	]
};
export default ListOfManpowerRefAppConfig;
