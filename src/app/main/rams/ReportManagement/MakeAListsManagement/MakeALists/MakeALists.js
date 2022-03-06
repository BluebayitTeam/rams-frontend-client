import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import MakeAListsHeader from './MakeAListsHeader';
import MakeAListsTable from './MakeAListsTable';

const MakeALists = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<MakeAListsHeader />}
			content={<MakeAListsTable />}
			innerScroll
		/>
	);
};
export default withReducer('makeAListsManagement', reducer)(MakeALists);
