import _ from '@lodash';
import moment from 'moment';

const PaymentVoucherModel = (data) =>
	_.defaults(data || {}, {
		payment_date: moment(new Date()).format('YYYY-MM-DD'),
		is_foreign_currency: false,
		is_dual_mode: false,
		currency_amount: 0,
		currency_rate: 0,
		items: [
			{
				ledger: '',
				debit_amount: 0,
				credit_amount: 0,
				is_post_date: false,
				is_cheque: 'cheque',
				cheque_no: '',
				balance: 0,
				inst_no: '',
				bank_name: '',
				cheque_date: '',
				bank_or_cash: false,
				pdc_note: '',
				remarks: '',
				favouring_name: ''
			},
			{
				ledger: null,
				debit_amount: 0,
				credit_amount: 0,
				is_post_date: false,
				is_cheque: 'cheque',

				cheque_no: '',
				balance: 0,
				inst_no: '',
				bank_name: '',
				cheque_date: '',
				bank_or_cash: false,
				pdc_note: '',
				remarks: '',
				favouring_name: ''
			}
		]
	});
export default PaymentVoucherModel;
