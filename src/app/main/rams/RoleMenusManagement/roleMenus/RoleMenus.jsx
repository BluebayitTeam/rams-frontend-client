import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import RoleMenusHeader from './RoleMenusHeader';
import RoleMenusTable from './RoleMenusTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The roleMenus page.
 */
function RoleMenus() {
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
        hasPermission('ROLE_MENU_LIST') && (
          <RoleMenusHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('ROLE_MENU_LIST') && (
          <RoleMenusTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default RoleMenus;
