import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function VisaStampOkReportApp() {
  return <Outlet />;
}

export default withReducer(
  'visaStampOkReportApp',
  reducer
)(VisaStampOkReportApp);
