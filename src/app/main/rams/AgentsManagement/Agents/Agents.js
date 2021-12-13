import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index.js';
import AgentsMuiTable from './AgentMuiTable';
import AgentsHeader from './AgentsHeader';


const Agents = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<AgentsHeader />}
            content={<AgentsMuiTable />}
            innerScroll
        />
    );
};
export default withReducer('agentsManagement', reducer)(Agents);