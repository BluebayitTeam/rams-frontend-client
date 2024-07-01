import _ from '@lodash';

const PayorderClearingModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('payorderClearing-'),
		name: ''
	});
export default PayorderClearingModel;
