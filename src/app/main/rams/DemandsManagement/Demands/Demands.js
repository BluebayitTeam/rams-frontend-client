import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import DemandsHeader from './DemandsHeader';
import DemandsTable from './DemandsTable';


const Demands = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<DemandsHeader />}
            content={<DemandsTable />}
            innerScroll
        />
    );
};
export default withReducer('demandsManagement', reducer)(Demands);
