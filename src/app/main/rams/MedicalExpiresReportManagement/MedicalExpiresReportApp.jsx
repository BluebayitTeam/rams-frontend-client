import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalExpiresReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalExpiresReportApp',
  reducer
)(MedicalExpiresReportApp);
