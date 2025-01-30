import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function RepatriationMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'repatriationMalaysiaReportApp',
  reducer
)(RepatriationMalaysiaReportApp);
