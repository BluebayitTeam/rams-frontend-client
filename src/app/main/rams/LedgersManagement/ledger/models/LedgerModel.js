import _ from '@lodash';

const LedgerModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('ledger-'),
		name: ''
	});
export default LedgerModel;
