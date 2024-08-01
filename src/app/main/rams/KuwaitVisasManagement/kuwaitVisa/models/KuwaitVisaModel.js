import _ from '@lodash';

const KuwaitVisaModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default KuwaitVisaModel;
