import _ from '@lodash';

const LedgerModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('ledger-'),
		name: null,
		head_group: null,
	});
export default LedgerModel;
