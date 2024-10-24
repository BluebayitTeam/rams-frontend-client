import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PassengersHeader from './PassengersHeader';
import PassengersTable from './PassengersTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

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
        hasPermission('PASSENGER_LIST') && (
          <PassengersHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('PASSENGER_LIST') && (
          <PassengersTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Passengers;
