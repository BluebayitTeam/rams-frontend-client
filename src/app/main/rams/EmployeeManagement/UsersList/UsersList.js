import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import UsersListHeader from './UsersListHeader';
import UsersListTable from './UsersListTable';


const UsersList = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<UsersListHeader />}
            content={<UsersListTable />}
            innerScroll
        />
    );
};
export default withReducer('employeesManagement', reducer)(UsersList);