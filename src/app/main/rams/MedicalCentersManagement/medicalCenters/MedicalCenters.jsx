import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import MedicalCentersHeader from './MedicalCentersHeader';
import MedicalCentersTable from './MedicalCentersTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The medicalCenters page.
 */
function MedicalCenters() {
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
        hasPermission('MEDICAL_CENTER_LIST') && (
          <MedicalCentersHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('MEDICAL_CENTER_LIST') && (
          <MedicalCentersTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default MedicalCenters;
