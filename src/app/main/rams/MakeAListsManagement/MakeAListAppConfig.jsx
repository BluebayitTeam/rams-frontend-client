import { Navigate } from 'react-router-dom';
import MakeAListApp from './MakeAListApp';
import MakeAList from './makeAList/MakeAList';
import MakeALists from './makeALists/MakeALists';
import MakeListColumn from './makeListColumns/makeListColumn/MakeListColumn';

/**
 * The E-Commerce app configuration.
 */
const MakeAListAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/makeAList',
      element: <MakeAListApp />,
      children: [
        {
          path: '',
          element: <Navigate to='makeALists' />,
        },
        {
          path: 'makeALists',
          element: <MakeALists />,
        },
        {
          path: 'makeALists/:makeAListId/*',
          element: <MakeAList />,
        },
        {
          path: 'makeALists/makeAListColumns/:makeAListId/*',
          element: <MakeListColumn />,
        },
      ],
    },
  ],
};
export default MakeAListAppConfig;
