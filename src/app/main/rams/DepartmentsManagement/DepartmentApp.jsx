import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DepartmentApp() {
	return <Outlet />;
}

export default withReducer('departmentApp', reducer)(DepartmentApp);
