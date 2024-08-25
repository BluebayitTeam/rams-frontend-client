import _ from '@lodash';

const MalefingerletterModel = (data) =>
	_.defaults(data || {}, {
		passenger: '',
		center_name: '',
		district: ''
	});
export default MalefingerletterModel;
