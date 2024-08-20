import { Navigate } from 'react-router-dom';
import TodotasktypeApp from './TodotasktypeApp';
import Todotasktypes from './todotasktypes/Todotasktypes';
import Todotasktype from './todotasktype/Todotasktype';

/**
 * The E-Commerce app configuration.
 */
const TodotasktypeAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/todotasktype',
			element: <TodotasktypeApp />,
			children: [
				{
					path: '',
					element: <Navigate to="todotasktypes" />
				},
				{
					path: 'todotasktypes',
					element: <Todotasktypes />
				},
				{
					path: 'todotasktypes/:todotasktypeId/*',
					element: <Todotasktype />
				}
			]
		}
	]
};
export default TodotasktypeAppConfig;
