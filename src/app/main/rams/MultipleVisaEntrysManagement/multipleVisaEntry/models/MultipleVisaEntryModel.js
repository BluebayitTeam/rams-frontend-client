import _ from '@lodash';

const MultipleVisaEntryModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default MultipleVisaEntryModel;
