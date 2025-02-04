import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SalarySlipsReportApp() {
  return <Outlet />;
}

export default withReducer(
  'salaryslipsReportApp',
  reducer
)(SalarySlipsReportApp);
