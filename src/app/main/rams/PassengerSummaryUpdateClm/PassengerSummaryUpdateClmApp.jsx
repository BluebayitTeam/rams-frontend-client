import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function PassengerSummaryUpdateClmApp() {
  return <Outlet />;
}

export default withReducer('passengerSummaryUpdateClmApp', reducer)(PassengerSummaryUpdateClmApp);
