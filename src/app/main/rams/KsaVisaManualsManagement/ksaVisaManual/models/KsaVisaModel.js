import _ from '@lodash';

const KsaVisaManualModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default KsaVisaManualModel;
