import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import MedicalCentersHeader from './MedicalCentersHeader';
import MedicalCentersTable from './MedicalCentersTable';


const MedicalCenters = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<MedicalCentersHeader />}
            content={<MedicalCentersTable />}
            innerScroll
        />
    );
};
export default withReducer('medicalCentersManagement', reducer)(MedicalCenters);