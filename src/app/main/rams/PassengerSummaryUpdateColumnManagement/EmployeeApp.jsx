import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function EmployeeApp() {
	return <Outlet />;
}

export default withReducer('employeeApp', reducer)(EmployeeApp);
