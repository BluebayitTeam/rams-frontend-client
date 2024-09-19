import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PassengerTypesHeader from './PassengerTypesHeader';
import PassengerTypesTable from './PassengerTypesTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The passengerTypes page.
 */
function PassengerTypes() {
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
        hasPermission('PASSENGER_TYPE_LIST') && (
          <PassengerTypesHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('PASSENGER_TYPE_LIST') && (
          <PassengerTypesTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default PassengerTypes;
