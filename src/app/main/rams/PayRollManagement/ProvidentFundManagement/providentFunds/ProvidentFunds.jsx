import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import ProvidentFundsHeader from './ProvidentFundsHeader';
import ProvidentFundsTable from './ProvidentFundsTable';

/**
 * The providentFunds page.
 */
function ProvidentFunds() {
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
        <ProvidentFundsHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      }
      content={
        <ProvidentFundsTable
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default ProvidentFunds;
