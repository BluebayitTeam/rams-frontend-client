import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function EmbassyApp() {
	return <Outlet />;
}

export default withReducer('embassyApp', reducer)(EmbassyApp);
