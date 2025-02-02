import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ScheduleApp() {
	return <Outlet />;
}

export default withReducer('scheduleApp', reducer)(ScheduleApp);
