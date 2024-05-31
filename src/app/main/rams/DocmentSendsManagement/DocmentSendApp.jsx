import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function DocmentSendApp() {
	return <Outlet />;
}

export default withReducer('docmentSendApp', reducer)(DocmentSendApp);
