import _ from '@lodash';

const DocmentSendModel = (data) =>
	_.defaults(data || {}, {
		checkbox: '',
		passengers:'',
		email: '',

		

	});
export default DocmentSendModel;
