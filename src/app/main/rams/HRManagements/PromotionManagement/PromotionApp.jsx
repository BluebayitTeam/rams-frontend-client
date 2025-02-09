import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PromotionApp() {
	return <Outlet />;
}

export default withReducer('promotionApp', reducer)(PromotionApp);
