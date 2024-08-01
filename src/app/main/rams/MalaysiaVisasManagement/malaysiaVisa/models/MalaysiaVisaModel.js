import _ from '@lodash';

const MalaysiaVisaModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default MalaysiaVisaModel;
