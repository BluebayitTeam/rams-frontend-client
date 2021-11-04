import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import PermissionsHeader from './PermissionsHeader';
import PermissionsTable from './PermissionsTable';


const Permissions = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<PermissionsHeader />}
            content={<PermissionsTable />}
            innerScroll
        />
    );
};
export default withReducer('permissionsManagement', reducer)(Permissions);