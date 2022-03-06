import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import PayableBillsHeader from './PayableBillsHeader';
import PayableBillsTable from './PayableBillsTable';

const PayableBills = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<PayableBillsHeader />}
			content={<PayableBillsTable />}
			innerScroll
		/>
	);
};
export default withReducer('payableBillsManagement', reducer)(PayableBills);
