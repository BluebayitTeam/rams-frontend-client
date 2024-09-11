import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function VisaSubmissionListApp() {
	return <Outlet />;
}

export default withReducer('visaSubmissionListApp', reducer)(VisaSubmissionListApp);
