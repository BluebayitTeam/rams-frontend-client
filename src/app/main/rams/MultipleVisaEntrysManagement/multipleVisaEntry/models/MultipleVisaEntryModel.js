import _ from '@lodash';

const MultipleVisaEntryModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: '',
		passengers: '',
		is_form_save: false
	});
export default MultipleVisaEntryModel;
