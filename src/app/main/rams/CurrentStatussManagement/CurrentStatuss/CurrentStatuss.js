import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import CurrentStatussHeader from './CurrentStatussHeader';
import CurrentStatussTable from './CurrentStatussTable';

const CurrentStatuss = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<CurrentStatussHeader />}
			content={<CurrentStatussTable />}
			innerScroll
		/>
	);
};
export default withReducer('currentStatussManagement', reducer)(CurrentStatuss);
