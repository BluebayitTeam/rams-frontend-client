import _ from '@lodash';

const PassengerSummaryUpdateClmModel = (data) =>
  _.defaults(data || {}, {
    column_name: '',
    id: '',
    key: '',
    serial: '',
    table_name: '',
    isChecked: false,
  });
export default PassengerSummaryUpdateClmModel;
