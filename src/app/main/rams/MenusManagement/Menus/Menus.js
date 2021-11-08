import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import MenusHeader from './MenusHeader';
import MenusTable from './MenusTable';

const Menus = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<MenusHeader />}
            content={<MenusTable />}
            innerScroll
        />
    );
};
export default withReducer('menusManagement', reducer)(Menus);