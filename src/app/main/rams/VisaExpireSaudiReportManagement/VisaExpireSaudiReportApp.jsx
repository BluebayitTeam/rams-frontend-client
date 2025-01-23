import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function VisaExpireSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'visaExpireSaudiReportApp',
  reducer
)(VisaExpireSaudiReportApp);
