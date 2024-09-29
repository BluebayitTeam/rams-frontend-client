import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import TicketPurchasesHeader from './TicketPurchasesHeader';
import TicketPurchasesTable from './TicketPurchasesTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The ticketPurchases page.
 */
function TicketPurchases() {
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
        hasPermission('DEPARTMENT_LIST') && (
          <TicketPurchasesHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('DEPARTMENT_LIST') && (
          <TicketPurchasesTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default TicketPurchases;
