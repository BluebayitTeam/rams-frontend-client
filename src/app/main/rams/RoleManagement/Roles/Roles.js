import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import RolesHeader from './RolesHeader';
import RolesTable from './RolesTable';


const Roles = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<RolesHeader />}
            content={<RolesTable />}
            innerScroll
        />
    );
};
export default withReducer('rolesManagement', reducer)(Roles);