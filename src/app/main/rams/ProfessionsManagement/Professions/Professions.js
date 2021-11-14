import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import ProfessionsHeader from './ProfessionsHeader';
import ProfessionsTable from './ProfessionsTable';

const Professions = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<ProfessionsHeader />}
            content={<ProfessionsTable />}
            innerScroll
        />
    );
};
export default withReducer('professionsManagement', reducer)(Professions);