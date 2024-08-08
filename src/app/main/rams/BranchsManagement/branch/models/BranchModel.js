import _ from '@lodash';

const BranchModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('branch-'),
		name: ''
	});
export default BranchModel;
