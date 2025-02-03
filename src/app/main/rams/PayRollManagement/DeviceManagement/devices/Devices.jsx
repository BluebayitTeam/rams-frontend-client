import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import { hasPermission } from 'src/app/constant/permission/permissionList';
import DevicesHeader from './DevicesHeader';
import DevicesTable from './DevicesTable';

/**
 * The devices page.
 */
function Devices() {
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
          <DevicesHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('DEPARTMENT_LIST') && (
          <DevicesTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Devices;
