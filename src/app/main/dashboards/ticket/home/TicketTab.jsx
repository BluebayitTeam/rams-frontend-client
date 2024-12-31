import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import TicketNew from '../AllCartTickets/TicketNew';
import PurchaseSummary from '../AllCartTickets/PurchaseSummary';
import TotalPurchaseSummary from '../AllCartTickets/TotalPurchaseSummary';
import TicketSalesChart from '../AllCartTickets/TicketSalesChart';
import TotalDepute from '../AllCartTickets/TotalDepute';
import TotalRefund from '../AllCartTickets/TotalRefund';
import TotalSales from '../AllCartTickets/TotalSales';
import TotalTicket from '../AllCartTickets/TotalTicket';
import { selectWidget } from '../TicketDashboardApi';

function TicketTab() {
  const widgets = useSelector(selectWidget);

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
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <TotalDepute />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full  sm:w-1/2 md:w-1/2 p-12'>
        <TicketSalesChart />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full  sm:w-1/2 md:w-1/2 p-12'>
        <TicketNew />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full  sm:w-1/2 md:w-1/2 p-12'>
        <PurchaseSummary />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full  sm:w-1/2 md:w-1/2 p-12'>
        <TotalPurchaseSummary />
      </motion.div>
    </motion.div>
  );
}

export default TicketTab;
