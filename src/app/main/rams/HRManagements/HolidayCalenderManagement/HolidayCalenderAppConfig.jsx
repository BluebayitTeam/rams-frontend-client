import { Navigate } from 'react-router-dom';
import HolidayCalender from './holidayCalender/HolidayCalender';
import HolidayCalenderApp from './HolidayCalenderApp';
import HolidayCalenders from './holidayCalenders/HolidayCalenders';

/**
 * The E-Commerce app configuration.
 */

const HolidayCalenderAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/holidayCalender',
      element: <HolidayCalenderApp />,
      children: [
        {
          path: '',
          element: <Navigate to='holidayCalenders' />,
        },
        {
          path: 'holidayCalenders',
          element: <HolidayCalenders />,
        },
        {
          path: 'holidayCalenders/:holidayCalenderId/*',
          element: <HolidayCalender />,
        },
      ],
    },
  ],
};
export default HolidayCalenderAppConfig;
