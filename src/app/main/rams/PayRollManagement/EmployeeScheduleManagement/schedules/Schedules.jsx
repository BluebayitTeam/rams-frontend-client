import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import SchedulesHeader from './SchedulesHeader';
import SchedulesTable from './SchedulesTable';

/**
 * The schedules page.
 */
function Schedules() {
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
        <SchedulesHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      }
      content={
        <SchedulesTable searchKey={searchKey} setSearchKey={setSearchKey} />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Schedules;
