import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import JournalIDsHeader from './JournalIDsHeader';
import JournalIDsTable from './JournalIDsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The journalIDs page.
 */
function JournalIDs() {
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
        hasPermission('IDJOURNAL_LIST') && (
          <JournalIDsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('IDJOURNAL_LIST') && (
          <JournalIDsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default JournalIDs;
