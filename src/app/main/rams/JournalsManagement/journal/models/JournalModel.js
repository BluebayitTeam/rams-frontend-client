import _ from '@lodash';
import moment from 'moment';

const JournalModel = (data) =>
	_.defaults(
		data || {},

		{
			journal_date: moment(new Date()).format('YYYY-MM-DD'),
			items: [
				{ ledger: null, debit_amount: 0, credit_amount: 0 },
				{ ledger: null, debit_amount: 0, credit_amount: 0 }
			]
		}
	);
export default JournalModel;
