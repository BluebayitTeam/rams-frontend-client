import _ from '@lodash';

const FemalefingerletterModel = (data) =>
	_.defaults(data || {}, {
		passenger: '',
		center_name: '',
		district: ''
	});
export default FemalefingerletterModel;
