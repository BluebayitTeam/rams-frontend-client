import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MakeAListApp() {
	return <Outlet />;
}

export default withReducer('makeAListApp', reducer)(MakeAListApp);
