import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import CurrentStatussHeader from './CurrentStatussHeader';
import CurrentStatussTable from './CurrentStatussTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The currentStatuss page.
 */
function CurrentStatuss() {
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
        hasPermission('CURRENT_STATUS_LIST') && (
          <CurrentStatussHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('CURRENT_STATUS_LIST') && (
          <CurrentStatussTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default CurrentStatuss;
