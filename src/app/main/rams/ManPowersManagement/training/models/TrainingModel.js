import _ from '@lodash';

const TrainingModel = (data) =>
	_.defaults(data || {}, {
		// profession: '',
		// country: '',
		// visa_agent: '',
		// company_name: '',
		// quantity: '',
		// salary: ''
	});
export default TrainingModel;
