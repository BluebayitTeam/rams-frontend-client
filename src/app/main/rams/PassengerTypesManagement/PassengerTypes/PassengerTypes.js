import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import PassengerTypesHeader from './PassengerTypesHeader';
import PassengerTypesTable from './PassengerTypesTable';

const PassengerTypes = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<PassengerTypesHeader />}
			content={<PassengerTypesTable />}
			innerScroll
		/>
	);
};
export default withReducer('passengerTypesManagement', reducer)(PassengerTypes);
