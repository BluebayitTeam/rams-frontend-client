import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MedicalApp() {
	return <Outlet />;
}

export default withReducer('medicalApp', reducer)(MedicalApp);
