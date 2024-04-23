import { Navigate } from 'react-router-dom';
import SubscriptionLoanApp from './SubscriptionLoanApp';
import SubscriptionLoans from './subscriptionLoans/SubscriptionLoans';
import SubscriptionLoan from './subscriptionLoan/SubscriptionLoan';

/**
 * The E-Commerce app configuration.
 */
const SubscriptionLoanAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/subscriptionLoan',
			element: <SubscriptionLoanApp />,
			children: [
				{
					path: '',
					element: <Navigate to="subscriptionLoans" />
				},
				{
					path: 'subscriptionLoans',
					element: <SubscriptionLoans />
				},
				{
					path: 'subscriptionLoans/:subscriptionLoanId/*',
					element: <SubscriptionLoan />
				}
			]
		}
	]
};
export default SubscriptionLoanAppConfig;
