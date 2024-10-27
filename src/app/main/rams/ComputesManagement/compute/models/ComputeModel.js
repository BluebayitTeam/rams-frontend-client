import _ from '@lodash';

const ComputeModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('compute-'),
    name: '',
  });
export default ComputeModel;
