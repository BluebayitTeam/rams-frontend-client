import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerSummaryUpdateApp() {
  return <Outlet />;
}

export default withReducer('passengerSummaryUpdateApp', reducer)(PassengerSummaryUpdateApp);
