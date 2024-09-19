import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ReceiptVouchersHeader from './ReceiptVouchersHeader';
import ReceiptVouchersTable from './ReceiptVouchersTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The receiptVouchers page.
 */
function ReceiptVouchers() {
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
        hasPermission('RECEIPT_VOUCHER_LIST') && (
          <ReceiptVouchersHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('RECEIPT_VOUCHER_LIST') && (
          <ReceiptVouchersTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default ReceiptVouchers;
