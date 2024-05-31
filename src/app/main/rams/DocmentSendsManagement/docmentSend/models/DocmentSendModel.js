import _ from '@lodash';

const DocmentSendModel = (data) =>
	_.defaults(data || {}, {
		visa_entry: ''
	});
export default DocmentSendModel;
