import _ from '@lodash';

const MakeListRowModel = (data) =>
  _.defaults(data || {}, {
    passenger: '',
    make_list: '',
  });
export default MakeListRowModel;
