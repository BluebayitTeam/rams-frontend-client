import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TodotasktypeApp() {
	return <Outlet />;
}

export default withReducer('todotasktypeApp', reducer)(TodotasktypeApp);
