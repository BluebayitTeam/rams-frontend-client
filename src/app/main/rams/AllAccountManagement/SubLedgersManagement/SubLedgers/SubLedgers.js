import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import SubLedgersHeader from './SubLedgersHeader';
import SubLedgersTable from './SubLedgersTable';

const SubLedgers = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<SubLedgersHeader />}
			content={<SubLedgersTable />}
			innerScroll
		/>
	);
};
export default withReducer('subLedgersManagement', reducer)(SubLedgers);
