import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { useState } from 'react';
import PromotionsHeader from './PromotionsHeader';
import PromotionsTable from './PromotionsTable';

/**
 * The promotions page.
 */
function Promotions() {
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
        <PromotionsHeader
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
        // )
      }
      content={
        // hasPermission('PAY_HEAD_TYPE_LIST') && (
        <PromotionsTable searchKey={searchKey} setSearchKey={setSearchKey} />
        // )
      }
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default Promotions;
