import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import GroupsHeader from './GroupsHeader';
import GroupsTable from './GroupsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The groups page.
 */
function Groups() {
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
        hasPermission('GROUP_LIST') && (
          <GroupsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('GROUP_LIST') && (
          <GroupsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Groups;
