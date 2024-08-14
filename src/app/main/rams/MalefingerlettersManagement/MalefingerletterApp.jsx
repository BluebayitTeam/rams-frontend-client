import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MalefingerletterApp() {
	return <Outlet />;
}

export default withReducer('malefingerletterApp', reducer)(MalefingerletterApp);
