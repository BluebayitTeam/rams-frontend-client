import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function JournalIdApp() {
	return <Outlet />;
}

export default withReducer('journalIdApp', reducer)(JournalIdApp);
