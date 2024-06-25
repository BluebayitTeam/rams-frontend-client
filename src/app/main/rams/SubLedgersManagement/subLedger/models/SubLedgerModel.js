import _ from '@lodash';

const SubLedgerModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('subLedger-'),
		name: ''
	});
export default SubLedgerModel;
