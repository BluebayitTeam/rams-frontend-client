import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PassengerSummaryUpdateClmsHeader from './PassengerSummaryUpdateClmsHeader';
import PassengerSummaryUpdateClmsTable from './PassengerSummaryUpdateClmsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

function PassengerSummaryUpdateClms() {
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
        hasPermission('PASSENGERSUMMARYUPDATECLM_LIST') && (
          <PassengerSummaryUpdateClmsHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('PASSENGERSUMMARYUPDATECLM_LIST') && (
          <PassengerSummaryUpdateClmsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default PassengerSummaryUpdateClms;
