import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function SalaryPaymentApp() {
  return <Outlet />;
}

export default withReducer('salaryPaymentApp', reducer)(SalaryPaymentApp);
