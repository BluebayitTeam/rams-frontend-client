import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ManpowerNoteSheetFemaleApp() {
	return <Outlet />;
}

export default withReducer('ManpowerNoteSheetFemaleApp', reducer)(ManpowerNoteSheetFemaleApp);
