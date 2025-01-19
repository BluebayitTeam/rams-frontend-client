import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function AttendanceTypeApp() {
	return <Outlet />;
}

export default withReducer('attendanceTypeApp', reducer)(AttendanceTypeApp);
