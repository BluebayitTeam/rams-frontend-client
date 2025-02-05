import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function UploadFileApp() {
	return <Outlet />;
}

export default withReducer('uploadfileApp', reducer)(UploadFileApp);

