import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function VisaAdviseMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'visaadviseMalaysiaReportApp',
  reducer
)(VisaAdviseMalaysiaReportApp);
