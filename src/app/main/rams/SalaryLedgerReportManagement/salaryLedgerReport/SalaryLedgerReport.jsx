import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { Icon, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';
import SalaryLedgerReportsTable from './SalaryLedgerReportsTable';
/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a salaryledgerReport name')
    .min(5, 'The salaryledgerReport name must be at least 5 characters'),
});

function SalaryLedgerReport() {
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
        <div className="flex flex-1 w-full items-center justify-between p-10">
          <div className="flex items-center">
            <Icon
              component={motion.span}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
              className="text-24 md:text-32"
            >
              person
            </Icon>
            <Typography
              component={motion.span}
              initial={{ x: -10 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
            >
              Salary Ledger Report
            </Typography>
          </div>
        </div>
        // <div className='flex'>
        //   <h1 className='hidden sm:flex text-16 md:text-24 mt-5 mx-12 font-semibold'>
        //     Salary Ledger Report
        //   </h1>
        // </div>
      }
      content={<SalaryLedgerReportsTable />}
      innerScroll
    />
  );
}

export default SalaryLedgerReport;
