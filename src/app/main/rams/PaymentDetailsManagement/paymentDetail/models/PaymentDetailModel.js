import _ from '@lodash';

const PaymentDetailModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('paymentDetail-'),
		name: ''
	});
export default PaymentDetailModel;
