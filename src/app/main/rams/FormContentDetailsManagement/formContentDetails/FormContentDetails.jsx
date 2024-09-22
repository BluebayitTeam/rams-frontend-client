import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import FormContentDetailsHeader from './FormContentDetailsHeader';
import FormContentDetailsTable from './FormContentDetailsTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The formContentDetails page.
 */
function FormContentDetails() {
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
        hasPermission('FORM_CONTENT_DETAIL_LIST') && (
          <FormContentDetailsHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('FORM_CONTENT_DETAIL_LIST') && (
          <FormContentDetailsTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default FormContentDetails;
