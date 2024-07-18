import _ from '@lodash';

const KsaVisaModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default KsaVisaModel;
