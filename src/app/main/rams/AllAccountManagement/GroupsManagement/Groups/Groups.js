import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import GroupsHeader from './GroupsHeader';
import GroupsTable from './GroupsTable';

const Groups = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<GroupsHeader />}
			content={<GroupsTable />}
			innerScroll
		/>
	);
};
export default withReducer('groupsManagement', reducer)(Groups);
