import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function VisaEntryReportApp() {
  return <Outlet />;
}

export default withReducer('visaEntryReportApp', reducer)(VisaEntryReportApp);
