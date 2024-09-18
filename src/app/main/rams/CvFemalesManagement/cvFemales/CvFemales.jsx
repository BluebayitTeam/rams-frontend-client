import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import CvFemalesHeader from './CvFemalesHeader';
import CvFemalesTable from './CvFemalesTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The agents page.
 */
function CvFemales() {
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
        hasPermission('FEMALE_CV_LIST') && (
          <CvFemalesHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        <CvFemalesTable searchKey={searchKey} setSearchKey={setSearchKey} />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default CvFemales;
