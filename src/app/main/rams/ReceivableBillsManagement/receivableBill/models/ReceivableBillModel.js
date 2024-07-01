import _ from '@lodash';
import moment from 'moment';

const ReceivableBillModel = (data) =>
	_.defaults(data || {}, {
		branch: '',
		is_multiple_passenger: false,
		is_npl: false,
		passenger: '',
		sub_ledger: '',
		sales_date: moment(new Date()).format('YYYY-MM-DD'),
		is_foreign_currency: false,
		ledger: '',
		debit_amount: 0,
		image: '',
		per_pax_amount: 0,
		currency: '',
		currency_rate: 0,
		currency_amount: 0
	});
export default ReceivableBillModel;
