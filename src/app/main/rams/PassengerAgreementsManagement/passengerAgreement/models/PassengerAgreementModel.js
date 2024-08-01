import _ from '@lodash';

const PassengerAgreementModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default PassengerAgreementModel;
