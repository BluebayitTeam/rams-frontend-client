import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalExpireMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalExpireMalaysiaReportApp',
  reducer
)(MedicalExpireMalaysiaReportApp);
