import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function BmetContractApp() {
	return <Outlet />;
}

export default withReducer('bmetContractApp', reducer)(BmetContractApp);
