import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ProfilesHeader from './ProfilesHeader';
import ProfilesTable from './ProfilesTable';

/**
 * The profiles page.
 */
function Profiles() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [searchKey, setSearchKey] = useState('');
  return (
    <FusePageCarded
      classes={{
        root: {},
        toolbar: 'p-0',
        header: 'min-h-80 h-80',
      }}
      // header={
      //   <ProfilesHeader searchKey={searchKey} setSearchKey={setSearchKey} />
      // }
      content={
        <ProfilesTable searchKey={searchKey} setSearchKey={setSearchKey} />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Profiles;
