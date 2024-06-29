import _ from '@lodash';
import moment from 'moment';

const ReceiptVoucherModel = (data) =>
	_.defaults(
		data || {},

		{
			contra_date: moment(new Date()).format('YYYY-MM-DD'),
			items: [
				{
					ledger: null,
					debit_amount: 0,
					credit_amount: 0,
					is_cheque: 'cheque',
					cheque_no: '',
					balance: 0,
					// inst_no: '',
					// bank_name: '',
					cheque_date: '',
					bank_or_cash: false
					// pdc_note: '',
					// remarks: '',
					// favouring_name: ''
				},
				{
					ledger: null,
					debit_amount: 0,
					credit_amount: 0,
					// is_post_date: false,
					cheque_no: '',
					balance: 0,
					// inst_no: '',
					// bank_name: '',
					cheque_date: '',
					bank_or_cash: false
					// pdc_note: '',
					// remarks: '',
					// favouring_name: ''
				}
			]
		}
	);
export default ReceiptVoucherModel;
