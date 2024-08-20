import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TodoApp() {
	return <Outlet />;
}

export default withReducer('todoApp', reducer)(TodoApp);
