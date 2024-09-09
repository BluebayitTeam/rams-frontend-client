import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ManpowerSubmissionV2ListApp() {
	return <Outlet />;
}

export default withReducer('manpowerSubmissionV2ListApp', reducer)(ManpowerSubmissionV2ListApp);
