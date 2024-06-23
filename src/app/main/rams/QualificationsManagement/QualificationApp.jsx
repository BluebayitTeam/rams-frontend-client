import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function QualificationApp() {
	return <Outlet />;
}

export default withReducer('qualificationApp', reducer)(QualificationApp);
