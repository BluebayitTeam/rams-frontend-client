import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function HandPassportMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'handpassportMalaysiaReportApp',
  reducer
)(HandPassportMalaysiaReportApp);
