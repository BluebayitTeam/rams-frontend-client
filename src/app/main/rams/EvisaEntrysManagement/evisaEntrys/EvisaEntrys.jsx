import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import EvisaEntrysHeader from './EvisaEntrysHeader';
import EvisaEntrysTable from './EvisaEntrysTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The evisaEntrys page.
 */
function EvisaEntrys() {
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
        hasPermission('EVISA_ENTRY_LIST') && (
          <EvisaEntrysHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('EVISA_ENTRY_LIST') && (
          <EvisaEntrysTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default EvisaEntrys;
