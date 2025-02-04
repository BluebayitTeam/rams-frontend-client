import _ from '@lodash';

const PayHeadModel = (data) =>
	_.defaults(data || {}, {
		// id: _.uniqueId('payHead-'),
		name: '',
	});
export default PayHeadModel;
