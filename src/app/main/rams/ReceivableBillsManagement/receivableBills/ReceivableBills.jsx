import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ReceivableBillsHeader from './ReceivableBillsHeader';
import ReceivableBillsTable from './ReceivableBillsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The receivableBills page.
 */
function ReceivableBills() {
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
        hasPermission('SALES_LIST') && (
          <ReceivableBillsHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('SALES_LIST') && (
          <ReceivableBillsTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default ReceivableBills;
