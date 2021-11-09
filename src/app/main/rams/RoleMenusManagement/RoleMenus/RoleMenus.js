import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import RoleMenusHeader from './RoleMenusHeader';
import RoleMenusTable from './RoleMenusTable';


const RoleMenus = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<RoleMenusHeader />}
            content={<RoleMenusTable />}
            innerScroll
        />
    );
};
export default withReducer('roleMenusManagement', reducer)(RoleMenus);