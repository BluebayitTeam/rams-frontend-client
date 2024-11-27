import _ from '@lodash';

const PassengerEditHistoryModel = (data) =>
  _.defaults(data || {}, {
    visa_entry: '',
  });
export default PassengerEditHistoryModel;
