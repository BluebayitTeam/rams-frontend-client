import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function PromotionConditionApp() {
	return <Outlet />;
}

export default withReducer('promotionConditionApp', reducer)(PromotionConditionApp);
