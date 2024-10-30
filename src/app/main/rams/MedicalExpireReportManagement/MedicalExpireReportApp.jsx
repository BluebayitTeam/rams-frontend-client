import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalExpireReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalExpireReportApp',
  reducer
)(MedicalExpireReportApp);
