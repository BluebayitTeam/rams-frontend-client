import _ from '@lodash';

const MultipleStatusUpdateModel = (data) =>
	_.defaults(data || {}, {
		date: '',
		passengers: '',
		status: '',
		is_form_save: false
	});
export default MultipleStatusUpdateModel;
