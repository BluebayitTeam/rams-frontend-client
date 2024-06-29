import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function JournalApp() {
	return <Outlet />;
}

export default withReducer('journalApp', reducer)(JournalApp);
