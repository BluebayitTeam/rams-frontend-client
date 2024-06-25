import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PaymentVouchersHeader from './PaymentVouchersHeader';
import PaymentVouchersTable from './PaymentVouchersTable';

/**
 * The paymentVouchers page.
 */
function PaymentVouchers() {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [searchKey, setSearchKey] = useState('');
	return (
		<FusePageCarded
			classes={{
				root: {},
				toolbar: 'p-0',
				header: 'min-h-80 h-80'
			}}
			header={
				<PaymentVouchersHeader
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			content={
				<PaymentVouchersTable
					searchKey={searchKey}
					setSearchKey={setSearchKey}
				/>
			}
			scroll={isMobile ? 'normal' : 'content'}
		/>
	);
}

export default PaymentVouchers;
