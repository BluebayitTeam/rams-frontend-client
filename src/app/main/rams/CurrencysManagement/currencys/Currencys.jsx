import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import CurrencysHeader from './CurrencysHeader';
import CurrencysTable from './CurrencysTable';
import { hasPermission } from 'src/app/constant/permission/permissionList';

/**
 * The currencys page.
 */
function Currencys() {
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
        hasPermission('CURRENCY_LIST') && (
          <CurrencysHeader searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      content={
        hasPermission('CURRENCY_LIST') && (
          <CurrencysTable searchKey={searchKey} setSearchKey={setSearchKey} />
        )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Currencys;
