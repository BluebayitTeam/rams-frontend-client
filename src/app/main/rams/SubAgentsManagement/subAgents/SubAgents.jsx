import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import SubAgentsHeader from './SubAgentsHeader';
import SubAgentsTable from './SubAgentsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The subAgents page.
 */
function SubAgents() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [searchKey, setSearchKey] = useState('');
  return (
    <FusePageCarded
      classes={{
        root: {},
        toolbar: 'p-0',
        header: 'min-h-80 h-80',
      }}
      header={
        hasPermission('AGENT_LIST') && (
          <SubAgentsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('AGENT_LIST') && (
          <SubAgentsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default SubAgents;
