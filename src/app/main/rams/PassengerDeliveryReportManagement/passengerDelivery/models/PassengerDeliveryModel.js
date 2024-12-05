import _ from '@lodash';

const PassengerDeliveryModel = (data) =>
  _.defaults(data || {}, {
    passenger: '',
  });
export default PassengerDeliveryModel;
