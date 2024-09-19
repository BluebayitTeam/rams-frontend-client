import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ProfessionsHeader from './ProfessionsHeader';
import ProfessionsTable from './ProfessionsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The professions page.
 */
function Professions() {
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
        hasPermission('PROFESSION_LIST') && (
          <ProfessionsHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('PROFESSION_LIST') && (
          <ProfessionsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Professions;
