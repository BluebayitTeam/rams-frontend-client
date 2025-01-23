import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function VisaStatusReportApp() {
  return <Outlet />;
}

export default withReducer('visaStatusReportApp', reducer)(VisaStatusReportApp);
