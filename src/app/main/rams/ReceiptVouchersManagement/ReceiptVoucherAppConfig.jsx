import { Navigate } from 'react-router-dom';
import ReceiptVoucherApp from './ReceiptVoucherApp';
import ReceiptVouchers from './receiptVouchers/ReceiptVouchers';
import ReceiptVoucher from './receiptVoucher/ReceiptVoucher';

/**
 * The E-Commerce app configuration.
 */
const ReceiptVoucherAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/receiptVoucher',
			element: <ReceiptVoucherApp />,
			children: [
				{
					path: '',
					element: <Navigate to="receiptVouchers" />
				},
				{
					path: 'receiptVouchers',
					element: <ReceiptVouchers />
				},
				{
					path: 'receiptVouchers/:receiptVoucherId/:invoice_no?',
					element: <ReceiptVoucher />
				}
			]
		}
	]
};
export default ReceiptVoucherAppConfig;
