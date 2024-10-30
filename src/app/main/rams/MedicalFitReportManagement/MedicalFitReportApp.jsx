import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function MedicalFitReportApp() {
  return <Outlet />;
}

export default withReducer('medicalFitReportApp', reducer)(MedicalFitReportApp);
