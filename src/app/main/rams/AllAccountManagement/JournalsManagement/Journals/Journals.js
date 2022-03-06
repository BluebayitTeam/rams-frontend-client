import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import JournalsHeader from './JournalsHeader';
import JournalsTable from './JournalsTable';

const Journals = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<JournalsHeader />}
			content={<JournalsTable />}
			innerScroll
		/>
	);
};
export default withReducer('journalsManagement', reducer)(Journals);
