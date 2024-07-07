import _ from '@lodash';
import moment from 'moment';

const MultipleStatusUpdateModel = (data) =>
	_.defaults(data || {}, {
		date: moment(new Date()).format('YYYY-MM-DD'),
		current_status: '',

		passengers: '',
		selected_value: ''
		// status: ''
	});
export default MultipleStatusUpdateModel;
