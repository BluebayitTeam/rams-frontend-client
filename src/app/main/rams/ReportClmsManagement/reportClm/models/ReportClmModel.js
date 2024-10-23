import _ from '@lodash';

const ReportClmModel = (data) =>
  _.defaults(data || {}, {
    column_name: '',
    id: '',
    key: '',
    serial: '',
    table_name: '',
    isChecked: false,
  });
export default ReportClmModel;
