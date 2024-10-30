import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function NotMedicalReportApp() {
  return <Outlet />;
}

export default withReducer('notMedicalReportApp', reducer)(NotMedicalReportApp);
