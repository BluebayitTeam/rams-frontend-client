import { Navigate } from 'react-router-dom';
import TodoApp from './TodoApp';
import Todos from './todos/Todos';
import Todo from './todo/Todo';

/**
 * The E-Commerce app configuration.
 */
const TodoAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/todo',
			element: <TodoApp />,
			children: [
				{
					path: '',
					element: <Navigate to="todos" />
				},
				{
					path: 'todos',
					element: <Todos />
				},
				{
					path: 'todos/:todoId/*',
					element: <Todo />
				}
			]
		}
	]
};
export default TodoAppConfig;
