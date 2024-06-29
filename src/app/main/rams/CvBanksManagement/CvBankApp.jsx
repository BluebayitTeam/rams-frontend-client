import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CvBankApp() {
	return <Outlet />;
}

export default withReducer('cvBankApp', reducer)(CvBankApp);
