import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function JobCategoryApp() {
	return <Outlet />;
}

export default withReducer('jobCategoryApp', reducer)(JobCategoryApp);
