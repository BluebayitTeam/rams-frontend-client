import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MultipleStatusUpdateApp() {
	return <Outlet />;
}

export default withReducer('multipleStatusUpdateApp', reducer)(MultipleStatusUpdateApp);
