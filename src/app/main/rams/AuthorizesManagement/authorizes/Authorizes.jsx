import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import AuthorizesHeader from './AuthorizesHeader';
import AuthorizesTable from './AuthorizesTable';

/**
 * The authorizes page.
 */
function Authorizes() {
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
        // hasPermission('AUTHORIZE_ACCOUNT_LIST') && (
        <AuthorizesHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        // )
      }
      content={
        // hasPermission('AUTHORIZE_ACCOUNT_LIST') && (
        <AuthorizesTable searchKey={searchKey} setSearchKey={setSearchKey} />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Authorizes;
