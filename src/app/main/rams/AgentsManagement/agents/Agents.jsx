import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import AgentsHeader from './AgentsHeader';
import AgentsTable from './AgentsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The agents page.
 */
function Agents() {
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
          <AgentsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('AGENT_LIST') && (
          <AgentsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Agents;
