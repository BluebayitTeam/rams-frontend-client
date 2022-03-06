import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import AgentsHeader from './AgentsHeader';
import AgentsTable from './AgentsTable';

const Agents = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<AgentsHeader />}
			content={<AgentsTable />}
			innerScroll
		/>
	);
};
export default withReducer('agentsManagement', reducer)(Agents);
