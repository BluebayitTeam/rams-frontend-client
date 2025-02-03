import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function TotalSalesReportApp() {
  return <Outlet />;
}

export default withReducer('TotalSalesReportApp', reducer)(TotalSalesReportApp);
