import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { z } from 'zod';
import PassengerEditHistorysTable from './PassengerEditHistorysTable';
import ManpowerEditHistorysTable from './ManpowerEditHistorysTable';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a passengerEditHistory name')
    .min(5, 'The passengerEditHistory name must be at least 5 characters'),
});

function PassengerEditHistory() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      headerBgHeight='102px'
      className='bg-grey-300'
      classes={{
        content: 'bg-grey-300',
        contentCard: 'overflow-hidden',
        header: 'min-h-52 h-52',
      }}
      header={<div className='flex'></div>}
      content={
        <div>
          <PassengerEditHistorysTable />
          <ManpowerEditHistorysTable />
        </div>
      }
      innerScroll
    />
  );
}

export default PassengerEditHistory;
