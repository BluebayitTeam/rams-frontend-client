import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import SubLedgersHeader from './SubLedgersHeader';
import SubLedgersTable from './SubLedgersTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The subLedgers page.
 */
function SubLedgers() {
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
        hasPermission('SUBLEDGER_ACCOUNT_LIST') && (
          <SubLedgersHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('SUBLEDGER_ACCOUNT_LIST') && (
          <SubLedgersTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default SubLedgers;
