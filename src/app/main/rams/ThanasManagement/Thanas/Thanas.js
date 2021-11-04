import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import ThanasHeader from './ThanasHeader';
import ThanasTable from './ThanasTable';


const Thanas = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<ThanasHeader />}
            content={<ThanasTable />}
            innerScroll
        />
    );
};
export default withReducer('thanasManagement', reducer)(Thanas);