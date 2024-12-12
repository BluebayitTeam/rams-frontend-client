import _ from '@lodash';

const PassengerSummaryUpdateClmModel = (data) =>
	_.defaults(data || {}, {
		first_name: '',
		logo: '',
		country_code1: '+880',

		show_country_code1: '+880',

		is_employee_active: true
	});
export default PassengerSummaryUpdateClmModel;
