import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TrialBalanceReportApp() {
  return <Outlet />;
}

export default withReducer(
  'trialBalanceReportApp',
  reducer
)(TrialBalanceReportApp);
