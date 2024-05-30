import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function VisaReissueListApp() {
	return <Outlet />;
}

export default withReducer('visaReissueListApp', reducer)(VisaReissueListApp);
