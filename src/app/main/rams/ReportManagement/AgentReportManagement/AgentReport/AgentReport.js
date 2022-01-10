import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import AgentReportsTable from './AgentReportsTable';

const AgentReport = () => {
	return (
		<FusePageCarded
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			content={<AgentReportsTable />}
			innerScroll
		/>
	);
};

export default withReducer('agentsReportManagement', reducer)(AgentReport);
