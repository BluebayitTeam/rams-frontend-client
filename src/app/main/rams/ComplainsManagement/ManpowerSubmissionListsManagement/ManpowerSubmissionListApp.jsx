import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ManpowerSubmissionListApp() {
	return <Outlet />;
}

export default withReducer('manpowerSubmissionListApp', reducer)(ManpowerSubmissionListApp);
