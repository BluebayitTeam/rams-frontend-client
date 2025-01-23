import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MedicalSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalSaudiReportApp',
  reducer
)(MedicalSaudiReportApp);
