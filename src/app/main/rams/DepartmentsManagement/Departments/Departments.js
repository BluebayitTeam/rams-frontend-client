import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import DepartmentsHeader from './DepartmentsHeader';
import DepartmentsTable from './DepartmentsTable';


const Departments = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<DepartmentsHeader />}
            content={<DepartmentsTable />}
            innerScroll
        />
    );
};
export default withReducer('departmentsManagement', reducer)(Departments);