import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalExpireSaudiReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalExpireSaudiReportApp',
  reducer
)(MedicalExpireSaudiReportApp);
