import { motion } from 'framer-motion';
import { selectWidget } from '../../TicketDashboardApi';
import { useSelector } from 'react-redux';
import TotalTicket from './widgets/TotalTicket';
import TotalSales from './widgets/TotalSales';
import TotalRefund from './widgets/TotalRefund';


/**
 * The TicketTab component.
 */
function TicketTab() {
	const widgets = useSelector(selectWidget);

  // console.log('widget', widget);

  	const container = {
      show: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

    const item = {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    };
  return (
    <motion.div
      className='flex flex-wrap'
      variants={container}
      initial='hidden'
      animate='show'>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <TotalTicket />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <TotalSales />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <TotalRefund />
      </motion.div>
    </motion.div>
  );
}

export default TicketTab;
