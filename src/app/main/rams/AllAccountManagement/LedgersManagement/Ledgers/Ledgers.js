import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import LedgersHeader from './LedgersHeader';
import LedgersTable from './LedgersTable';

const Ledgers = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<LedgersHeader />}
			content={<LedgersTable />}
			innerScroll
		/>
	);
};
export default withReducer('ledgersManagement', reducer)(Ledgers);
