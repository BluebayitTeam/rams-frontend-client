import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MaletrainingApp() {
	return <Outlet />;
}

export default withReducer('maletrainingApp', reducer)(MaletrainingApp);
