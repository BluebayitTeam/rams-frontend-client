import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import PassengersHeader from './PassengersHeader';
import PassengersTable from './PassengersTable';

const Passengers = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-60 h-60'
			}}
			header={<PassengersHeader />}
			content={<PassengersTable />}
			innerScroll
		/>
	);
};
export default withReducer('passengersManagement', reducer)(Passengers);
