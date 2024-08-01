import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerAgreementApp() {
	return <Outlet />;
}

export default withReducer('passengerAgreementApp', reducer)(PassengerAgreementApp);
