import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function ProfitLossReportApp() {
  return <Outlet />;
}

export default withReducer('profitLossReportApp', reducer)(ProfitLossReportApp);
