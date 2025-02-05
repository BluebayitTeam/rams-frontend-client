import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function HolidayCalenderApp() {
  return <Outlet />;
}

export default withReducer('holidayCalenderApp', reducer)(HolidayCalenderApp);
