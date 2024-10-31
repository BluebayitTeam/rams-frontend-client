import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import VisaExpireReportsTable from './VisaExpiresReportsTable';

/**
 * Form Validation Schema
 */
const schema = z.object({
  first_name: z
    .string()
    .nonempty('You must enter a visaExpiresReport name')
    .min(5, 'The visaExpiresReport name must be at least 5 characters'),
});

function VisaExpiresReport() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const theme = useTheme();

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
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
          <Typography
            className='flex items-center sm:mb-12'
            component={Link}
            role='button'
            to='/apps/agent/agents'
            color='inherit'>
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className='flex mx-4 font-medium'>
              {' '}
              Medical Expires Report
            </span>
          </Typography>
        </motion.div>
      }
      content={<VisaExpireReportsTable />}
      innerScroll
    />
  );
}

export default VisaExpiresReport;
