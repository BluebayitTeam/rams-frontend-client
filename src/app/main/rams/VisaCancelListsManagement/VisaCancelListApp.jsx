import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function VisaCancelListApp() {
	return <Outlet />;
}

export default withReducer('visaCancelListApp', reducer)(VisaCancelListApp);
