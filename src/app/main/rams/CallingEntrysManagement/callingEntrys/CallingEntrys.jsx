import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import CallingEntrysHeader from './CallingEntrysHeader';
import CallingEntrysTable from './CallingEntrysTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The callingEntrys page.
 */
function CallingEntrys() {
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
        hasPermission('CALLING_ENTRY_LIST') && (
          <CallingEntrysHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('CALLING_ENTRY_LIST') && (
          <CallingEntrysTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default CallingEntrys;
