import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import TicketeditsHeader from './TicketeditsHeader';
import TicketeditsTable from './TicketeditsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The ticketedits page.
 */
function Ticketedits() {
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
          <TicketeditsHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('DEPARTMENT_LIST') && (
          <TicketeditsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Ticketedits;
