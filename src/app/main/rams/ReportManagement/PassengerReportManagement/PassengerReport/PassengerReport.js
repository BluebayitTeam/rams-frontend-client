import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import PassengerReportsTable from './PassengerReportsTable';

const PassengerReport = () => {
	return (
		<FusePageCarded
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'h min-h-72',
				topBg: ''
			}}
			content={<PassengerReportsTable />}
			innerScroll
		/>
	);
};

export default withReducer('passengersReportManagement', reducer)(PassengerReport);
