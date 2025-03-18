import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import CandidateApplicationsHeader from './CandidateApplicationsHeader';
import CandidateApplicationsTable from './CandidateApplicationsTable';

/**
 * The CandidateApplications page.
 */
function CandidateApplications() {
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
        // hasPermission('CANDIDATE_APPLICATION') && (
        <CandidateApplicationsHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      content={
        // hasPermission('CANDIDATE_APPLICATION') && (
        <CandidateApplicationsTable
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default CandidateApplications;
