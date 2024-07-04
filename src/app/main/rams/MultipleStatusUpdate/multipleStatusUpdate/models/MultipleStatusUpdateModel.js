import _ from '@lodash';

const MultipleStatusUpdateModel = (data) =>
	_.defaults(data || {}, {
		date: '',
		passengers: '',
		selected_value: '',
		status: ''
	});
export default MultipleStatusUpdateModel;
