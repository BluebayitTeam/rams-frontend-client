import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import TicketDeputesHeader from './TicketDeputesHeader';
import TicketDeputesTable from './TicketDeputesTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The ticketDeputes page.
 */
function TicketDeputes() {
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
          <TicketDeputesHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('DEPARTMENT_LIST') && (
          <TicketDeputesTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default TicketDeputes;
