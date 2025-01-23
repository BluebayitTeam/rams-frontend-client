import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalVisitReportApp() {
  return <Outlet />;
}

export default withReducer(
  'medicalVisitReportApp',
  reducer
)(MedicalVisitReportApp);
