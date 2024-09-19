import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import RecruitingAgencysHeader from './RecruitingAgencysHeader';
import RecruitingAgencysTable from './RecruitingAgencysTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The recruitingAgencys page.
 */
function RecruitingAgencys() {
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
        hasPermission('RECRUITING_AGENCY_LIST') && (
          <RecruitingAgencysHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('RECRUITING_AGENCY_LIST') && (
          <RecruitingAgencysTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default RecruitingAgencys;
