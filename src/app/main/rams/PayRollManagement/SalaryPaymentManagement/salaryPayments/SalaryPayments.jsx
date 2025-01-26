import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import SalaryPaymentsHeader from './SalaryPaymentsHeader';
import SalaryPaymentsTable from './SalaryPaymentsTable';

/**
 * The salaryPayments page.
 */
function SalaryPayments() {
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
        <SalaryPaymentsHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      content={
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <SalaryPaymentsTable
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default SalaryPayments;
