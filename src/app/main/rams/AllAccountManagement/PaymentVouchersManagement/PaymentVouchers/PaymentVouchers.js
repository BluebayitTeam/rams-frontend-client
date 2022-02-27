import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import PaymentVouchersHeader from './PaymentVouchersHeader';
import PaymentVouchersTable from './PaymentVouchersTable';

const PaymentVouchers = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<PaymentVouchersHeader />}
			content={<PaymentVouchersTable />}
			innerScroll
		/>
	);
};
export default withReducer('paymentVouchersManagement', reducer)(PaymentVouchers);
