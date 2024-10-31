import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function VisaExpireReportApp() {
  return <Outlet />;
}

export default withReducer('visaExpireReportApp', reducer)(VisaExpireReportApp);
