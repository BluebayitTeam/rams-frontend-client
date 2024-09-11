import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function ListOfManpowerRefApp() {
	return <Outlet />;
}

export default withReducer('listOfManpowerRefApp', reducer)(ListOfManpowerRefApp);
