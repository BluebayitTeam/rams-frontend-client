import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PostDateChequesHeader from './PostDateChequesHeader';
import PostDateChequesTable from './PostDateChequesTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The postDateCheques page.
 */
function PostDateCheques() {
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
        hasPermission('POST_DATE_CHEQUE_LIST') && (
          <PostDateChequesHeader
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      content={
        hasPermission('POST_DATE_CHEQUE_LIST') && (
          <PostDateChequesTable
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default PostDateCheques;
