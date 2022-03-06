import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import LedgerReportsTable from './LedgerReportsTable';

const LedgerReport = () => {
	return (
		<FusePageCarded
			headerBgHeight="102px"
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'min-h-52 h-52'
			}}
			content={<LedgerReportsTable />}
			innerScroll
		/>
	);
};

export default withReducer('ledgersReportManagement', reducer)(LedgerReport);
