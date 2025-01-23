import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalUnfitReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalUnfitReportApp',
  reducer
)(MedicalUnfitReportApp);
