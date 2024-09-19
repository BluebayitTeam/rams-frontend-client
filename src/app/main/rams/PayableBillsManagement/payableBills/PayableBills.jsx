import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PayableBillsHeader from './PayableBillsHeader';
import PayableBillsTable from './PayableBillsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The payableBills page.
 */
function PayableBills() {
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
        hasPermission('PURCHASE_LIST') && (
          <PayableBillsHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('PURCHASE_LIST') && (
          <PayableBillsTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default PayableBills;
