import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import BranchsHeader from './BranchsHeader';
import BranchsTable from './BranchsTable';

const Branchs = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<BranchsHeader />}
			content={<BranchsTable />}
			innerScroll
		/>
	);
};
export default withReducer('branchsManagement', reducer)(Branchs);
