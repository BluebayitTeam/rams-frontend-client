import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

/**
 * The autostatusupdate header.
 */
function AutoStatusUpdateHeader() {
  const routeParams = useParams();
  const data = {};
  const name = data?.passenger?.[0]?.passenger_name;

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex flex-col items-start max-w-full min-w-0'>
        <div className='flex items-center max-w-full'>
          <motion.div
            className='hidden sm:flex'
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          />

          <div className='flex flex-col min-w-0 mx-8 sm:mc-16'>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.3 } }}>
              <Typography className='text-16 text-center sm:text-20 truncate font-semibold'>
                Auto Status Update
              </Typography>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoStatusUpdateHeader;
