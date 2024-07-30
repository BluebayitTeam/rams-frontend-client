import _ from '@lodash';

const BmetContractModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default BmetContractModel;
