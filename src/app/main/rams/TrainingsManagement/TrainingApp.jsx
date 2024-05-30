import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TrainingApp() {
	return <Outlet />;
}

export default withReducer('trainingApp', reducer)(TrainingApp);
