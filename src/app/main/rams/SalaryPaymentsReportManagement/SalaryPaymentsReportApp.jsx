import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SalaryPaymentsReportApp() {
  return <Outlet />;
}

export default withReducer(
  'salarypaymentsReportApp',
  reducer
)(SalaryPaymentsReportApp);
