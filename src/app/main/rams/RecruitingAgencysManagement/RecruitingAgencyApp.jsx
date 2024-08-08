import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function RecruitingAgencyApp() {
	return <Outlet />;
}

export default withReducer('recruitingAgencyApp', reducer)(RecruitingAgencyApp);
