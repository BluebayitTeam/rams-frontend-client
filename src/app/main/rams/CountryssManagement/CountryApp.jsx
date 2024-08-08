import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CountryApp() {
	return <Outlet />;
}

export default withReducer('countryApp', reducer)(CountryApp);
