import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/index';
import SitesettingsHeader from './SitesettingsHeader';
import SitesettingsTable from './SitesettingsTable';

const Sitesettings = () => {
    return (
        <FusePageCarded
            classes={{
                content: 'flex',
                contentCard: 'overflow-hidden',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
            }}
            header={<SitesettingsHeader />}
            content={<SitesettingsTable />}
            innerScroll
        />
    );
};
export default withReducer('sitesettingsManagement', reducer)(Sitesettings);