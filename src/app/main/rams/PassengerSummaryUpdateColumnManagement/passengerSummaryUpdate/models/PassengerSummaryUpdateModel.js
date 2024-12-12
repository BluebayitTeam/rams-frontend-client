import _ from '@lodash';

const PassengerSummaryUpdateModel = (data) =>
	_.defaults(data || {}, {
		profession: '',
		country: '',
		visa_agent: '',
		company_name: '',
		quantity: '',
		salary: ''
	});
export default PassengerSummaryUpdateModel;
