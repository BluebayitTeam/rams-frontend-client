import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import MedicalReportsTable from './MedicalReportsTable';

const MedicalReport = () => {
	return (
		<FusePageCarded
			className="bg-grey-300"
			classes={{
				content: 'bg-grey-300',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64',
				topBg: ''
			}}
			content={<MedicalReportsTable />}
			innerScroll
		/>
	);
};

export default withReducer('medicalsReportManagement', reducer)(MedicalReport);
