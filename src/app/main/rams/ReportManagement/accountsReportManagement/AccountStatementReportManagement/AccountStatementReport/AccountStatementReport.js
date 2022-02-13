import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import AccountStatementReportsTable from './AccountStatementReportsTable';

const AccountStatementReport = () => {
	return (
		<FusePageCarded
			headerBgHeight="102px"
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'min-h-52 h-52'
			}}
			content={<AccountStatementReportsTable />}
			innerScroll
		/>
	);
};

export default withReducer('accountStatementsReportManagement', reducer)(AccountStatementReport);
