import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import RecruitingAgencysHeader from './RecruitingAgencysHeader';
import RecruitingAgencysTable from './RecruitingAgencysTable';


const RecruitingAgencys = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<RecruitingAgencysHeader />}
            content={<RecruitingAgencysTable />}
            innerScroll
        />
    );
};
export default withReducer('recruitingAgencysManagement', reducer)(RecruitingAgencys);



