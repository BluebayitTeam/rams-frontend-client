import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MofaApp() {
	return <Outlet />;
}

export default withReducer('mofaApp', reducer)(MofaApp);
