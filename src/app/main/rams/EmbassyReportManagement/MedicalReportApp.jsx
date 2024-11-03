import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MedicalReportApp() {
  return <Outlet />;
}

export default withReducer('medicalReportApp', reducer)(MedicalReportApp);
