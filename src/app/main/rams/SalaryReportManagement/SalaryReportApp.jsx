import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SalaryReportApp() {
  return <Outlet />;
}

export default withReducer('salaryReportApp', reducer)(SalaryReportApp);
