import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import JournalsHeader from './JournalsHeader';
import JournalsTable from './JournalsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The journals page.
 */
function Journals() {
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
        hasPermission('JOURNAL_LIST') && (
          <JournalsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('JOURNAL_LIST') && (
          <JournalsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Journals;
