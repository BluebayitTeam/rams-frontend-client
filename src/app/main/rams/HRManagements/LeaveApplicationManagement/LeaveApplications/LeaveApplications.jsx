import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import LeaveApplicationsHeader from './LeaveApplicationsHeader';
import LeaveApplicationsTable from './LeaveApplicationsTable';

/**
 * The LeaveApplications page.
 */
function LeaveApplications() {
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
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <LeaveApplicationsHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      content={
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <LeaveApplicationsTable
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default LeaveApplications;
