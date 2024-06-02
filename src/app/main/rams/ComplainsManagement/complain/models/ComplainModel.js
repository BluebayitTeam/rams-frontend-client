import _ from '@lodash';

const ComplainModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('complain-'),
		first_name: '',
		logo: '',
		country_code1: '+880',
		country_code2: '+880',
		show_country_code1: '+880',
		show_country_code2: '+880',
		is_complain_active: true
	});
export default ComplainModel;
