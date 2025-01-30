import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalMalaysiaReportApp',
  reducer
)(MedicalMalaysiaReportApp);
