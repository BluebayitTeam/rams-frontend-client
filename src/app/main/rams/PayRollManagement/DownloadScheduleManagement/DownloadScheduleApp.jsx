import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function DownloadScheduleApp() {
	return <Outlet />;
}

export default withReducer('downloadscheduleApp', reducer)(DownloadScheduleApp);
