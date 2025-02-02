import _ from '@lodash';

const DeviceModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('device-'),
    name: '',
  });
export default DeviceModel;
