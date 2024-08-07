import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MedicalCenterApp() {
	return <Outlet />;
}

export default withReducer('medicalCenterApp', reducer)(MedicalCenterApp);
