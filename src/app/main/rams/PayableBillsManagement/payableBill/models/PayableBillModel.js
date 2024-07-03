import _ from '@lodash';
import moment from 'moment';

const PayableBillModel = (data) =>
	_.defaults(data || {}, {
		branch: '',
		is_multiple_passenger: false,
		is_npl: false,
		passenger: '',
		passenger_list: [],
		sub_ledger: '',
		sales_date: moment(new Date()).format('YYYY-MM-DD'),
		is_foreign_currency: false,
		ledger: '',
		credit_amount: 0,
		file: '',
		per_pax_amount: 0,
		currency: '',
		currency_rate: 0,
		currency_amount: 0
	});
export default PayableBillModel;
