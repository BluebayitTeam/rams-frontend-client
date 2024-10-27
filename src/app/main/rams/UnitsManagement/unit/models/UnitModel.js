import _ from '@lodash';

const UnitModel = (data) =>
  _.defaults(data || {}, {
    id: _.uniqueId('unit-'),
    name: '',
  });
export default UnitModel;
