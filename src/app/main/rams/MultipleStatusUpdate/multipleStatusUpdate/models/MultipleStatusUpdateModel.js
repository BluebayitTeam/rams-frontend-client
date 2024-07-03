import _ from '@lodash';

const DocmentSendModel = (data) =>
	_.defaults(data || {}, {
		date: '',
		passengers: '',
		status: ''
	});
export default DocmentSendModel;
