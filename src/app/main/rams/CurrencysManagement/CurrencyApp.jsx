import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function CurrencyApp() {
	return <Outlet />;
}

export default withReducer('currencyApp', reducer)(CurrencyApp);
