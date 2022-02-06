import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import ReceivableBillsHeader from './ReceivableBillsHeader';
import ReceivableBillsTable from './ReceivableBillsTable';

const ReceivableBills = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<ReceivableBillsHeader />}
			content={<ReceivableBillsTable />}
			innerScroll
		/>
	);
};
export default withReducer('receivableBillsManagement', reducer)(ReceivableBills);
