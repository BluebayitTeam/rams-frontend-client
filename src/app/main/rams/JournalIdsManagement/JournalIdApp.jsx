import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function JournalIDApp() {
	return <Outlet />;
}

export default withReducer('journalIDApp', reducer)(JournalIDApp);
