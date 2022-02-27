import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import MedicalCentersHeader from './MedicalCentersHeader';
import MedicalCentersTable from './MedicalCentersTable';

const MedicalCenters = () => {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-64 h-64'
			}}
			header={<MedicalCentersHeader />}
			content={<MedicalCentersTable />}
			innerScroll
		/>
	);
};
export default withReducer('medicalCentersManagement', reducer)(MedicalCenters);
