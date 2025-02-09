import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ShortlistedCandidatesHeader from './ShortlistedCandidatesHeader';
import ShortlistedCandidatesTable from './ShortlistedCandidatesTable';

/**
 * The ShortlistedCandidates page.
 */
function ShortlistedCandidates() {
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
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <ShortlistedCandidatesHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      content={
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <ShortlistedCandidatesTable
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default ShortlistedCandidates;
