import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function CalculationTypeApp() {
	return <Outlet />;
}

export default withReducer('calculationTypeApp', reducer)(CalculationTypeApp);
