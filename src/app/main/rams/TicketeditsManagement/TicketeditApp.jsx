import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TicketeditApp() {
	return <Outlet />;
}

export default withReducer('ticketeditApp', reducer)(TicketeditApp);
