import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import QualificationsHeader from './QualificationsHeader';
import QualificationsTable from './QualificationsTable';


const Qualifications = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<QualificationsHeader />}
            content={<QualificationsTable />}
            innerScroll
        />
    );
};
export default withReducer('qualificationsManagement', reducer)(Qualifications);