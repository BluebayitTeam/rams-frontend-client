import _ from '@lodash';

const MultipleStatusUpdateModel = (data) =>
	_.defaults(data || {}, {
		date: '',
		passengers: '',
		status: ''
	});
export default MultipleStatusUpdateModel;
