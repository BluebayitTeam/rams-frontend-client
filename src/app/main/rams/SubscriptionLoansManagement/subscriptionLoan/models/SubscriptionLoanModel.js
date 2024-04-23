import _ from '@lodash';

const SubscriptionLoanModel = (data) =>
	_.defaults(data || {}, {
		id: _.uniqueId('subscriptionLoan-'),
		name: ''
	});
export default SubscriptionLoanModel;
