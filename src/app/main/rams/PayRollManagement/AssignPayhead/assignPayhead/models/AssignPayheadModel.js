import _ from '@lodash';

const AssignPayheadModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('assignPayhead-'),
    name: '',
  });
export default AssignPayheadModel;
