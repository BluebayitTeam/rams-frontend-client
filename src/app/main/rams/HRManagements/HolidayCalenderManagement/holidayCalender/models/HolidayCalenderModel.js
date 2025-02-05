import _ from '@lodash';

const HolidayCalenderModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('holidayCalender-'),
    name: '',
  });
export default HolidayCalenderModel;
