import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PassengersHeader from './PassengersHeader';
import PassengersTable from './PassengersTable';

/**
 * The passengers page.
 */
function Passengers() {
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
        <PassengersHeader searchKey={searchKey} setSearchKey={setSearchKey} />
      }
      content={
        <PassengersTable searchKey={searchKey} setSearchKey={setSearchKey} />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Passengers;
