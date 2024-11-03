import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function CompanyOverviewReportApp() {
  return <Outlet />;
}

export default withReducer(
  'companyOverviewReportApp',
  reducer
)(CompanyOverviewReportApp);
