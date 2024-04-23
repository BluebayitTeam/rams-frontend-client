import { Navigate } from 'react-router-dom';
import MenuApp from './MenuApp';
import Menus from './menus/Menus';
import Menu from './menu/Menu';

/**
 * The E-Commerce app configuration.
 */
const MenuAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/menu',
			element: <MenuApp />,
			children: [
				{
					path: '',
					element: <Navigate to="menus" />
				},
				{
					path: 'menus',
					element: <Menus />
				},
				{
					path: 'menus/:menuId/*',
					element: <Menu />
				}
			]
		}
	]
};
export default MenuAppConfig;
