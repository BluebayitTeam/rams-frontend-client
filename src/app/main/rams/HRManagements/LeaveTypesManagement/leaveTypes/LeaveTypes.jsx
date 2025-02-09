import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import LeaveTypesHeader from './LeaveTypesHeader';
import LeaveTypesTable from './LeaveTypesTable';

/**
 * The LeaveTypes page.
 */
function LeaveTypes() {
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
        <LeaveTypesHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        // )
      }
      content={
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <LeaveTypesTable searchKey={searchKey} setSearchKey={setSearchKey} />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default LeaveTypes;
