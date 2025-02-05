import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import HolidayCalendersHeader from './HolidayCalendersHeader';
import HolidayCalendersTable from './HolidayCalendersTable';

/**
 * The holidayCalenders page.
 */
function HolidayCalenders() {
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
        <HolidayCalendersHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      content={
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <HolidayCalendersTable
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default HolidayCalenders;
