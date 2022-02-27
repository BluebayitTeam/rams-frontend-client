import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import ReceiptVouchersHeader from './ReceiptVouchersHeader';
import ReceiptVouchersTable from './ReceiptVouchersTable';

const ReceiptVouchers = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<ReceiptVouchersHeader />}
			content={<ReceiptVouchersTable />}
			innerScroll
		/>
	);
};
export default withReducer('receiptVouchersManagement', reducer)(ReceiptVouchers);
