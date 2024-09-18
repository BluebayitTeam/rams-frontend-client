import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import MakeAListsHeader from './MakeAListsHeader';
import MakeAListsTable from './MakeAListsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The makeALists page.
 */
function MakeALists() {
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
        hasPermission('MAKE_LIST_LIST') && (
          <MakeAListsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('MAKE_LIST_LIST') && (
          <MakeAListsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default MakeALists;
