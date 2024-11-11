import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { z } from 'zod';
import AuthorizeLogReportsTable from './AuthorizeLogReportsTable';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a authorizeLogReport name')
    .min(5, 'The authorizeLogReport name must be at least 5 characters'),
});

function AuthorizeLogReport() {
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
      header={
        <div className='flex'>
          <h1 className='hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold'>
            Account Authorize Log Report
          </h1>
        </div>
      }
      content={<AuthorizeLogReportsTable />}
      innerScroll
    />
  );
}

export default AuthorizeLogReport;
