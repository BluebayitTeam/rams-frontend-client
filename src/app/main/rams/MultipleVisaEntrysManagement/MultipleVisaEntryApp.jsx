import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MultipleVisaEntryApp() {
	return <Outlet />;
}

export default withReducer('multipleVisaEntryApp', reducer)(MultipleVisaEntryApp);
