import _ from '@lodash';

const MultipleVisaEntryModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: '',
		passengers: ''
	});
export default MultipleVisaEntryModel;
