import _ from '@lodash';

const CallingEmbAttestationModel = (data) =>
	_.defaults(data || {}, {
		// profession: '',
		// country: '',
		// visa_agent: '',
		// company_name: '',
		// quantity: '',
		// salary: ''
	});
export default CallingEmbAttestationModel;
