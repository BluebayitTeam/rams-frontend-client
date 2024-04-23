import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function FeatureDetailApp() {
	return <Outlet />;
}

export default withReducer('featureDetailApp', reducer)(FeatureDetailApp);
