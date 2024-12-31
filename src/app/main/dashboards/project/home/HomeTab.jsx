import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectWidget } from '../ProjectDashboardApi';
import UpcomingMedical from '../AllCartsProjrcts/UpcomingMedical';
import UpcomingVisa from '../AllCartsProjrcts/UpcomingVisa';
import UpcomingEvisa from '../AllCartsProjrcts/UpcomingEvisa';
import UpcomingEmbassy from '../AllCartsProjrcts/UpcomingEmbassy';
import NotMedical from '../AllCartsProjrcts/NotMedical';
import Fit from '../AllCartsProjrcts/Fit';
import UnFit from '../AllCartsProjrcts/UnFit';
import Visits from '../AllCartsProjrcts/Visits';
import Visa from '../AllCartsProjrcts/Visa';
import Manpower from '../AllCartsProjrcts/Manpower';
import FlightWaiting from '../AllCartsProjrcts/FlightWaiting';
import FlightDone from '../AllCartsProjrcts/FlightDone';
import FlightChart from '../AllCartsProjrcts/FlightChart';
import LatestFlight from '../AllCartsProjrcts/LatestFlight';
import StatusSummary from '../AllCartsProjrcts/StatusSummary';
import IncompleteFlight from '../AllCartsProjrcts/IncompleteFlight';
import AccountSummary from '../AllCartsProjrcts/AccountSummary';
import DebtorCreditor from '../AllCartsProjrcts/DebtorCreditor';

/**
 * The HomeTab component.
 */
function HomeTab() {
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
      <motion.div variants={item} className='widget flex w-full'>
        <h1 className='font-700 mx-20 text-blue-800'>Expire Status</h1>
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingMedical />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingVisa />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingEvisa />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingEmbassy />
      </motion.div>
      <motion.div variants={item} className='widget flex w-full mt-24'>
        <h1 className='font-700 mx-20 text-green-800'>Medical Status</h1>
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <NotMedical />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Fit />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UnFit />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Visits />
      </motion.div>
      <motion.div variants={item} className='widget flex w-full mt-24'>
        <h1 className='font-700 mx-20 text-purple-800'>
          Visa,Manpower & Flight Status
        </h1>
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Visa />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Manpower />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <FlightWaiting />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <FlightDone />
      </motion.div>
      <motion.div variants={item} className='widget flex w-full p-12'>
        <FlightChart />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/2 p-12'>
        <LatestFlight />
      </motion.div>
      <motion.div
        variants={item}
        className='widget  w-full sm:w-1/2 md:w-1/2 p-12'>
        <StatusSummary />
        <IncompleteFlight />
      </motion.div>
      <motion.div
        variants={item}
        className='widget  w-full sm:w-1/2 md:w-1/2 p-12'>
        <AccountSummary />
      </motion.div>
      <motion.div
        variants={item}
        className='widget  w-full sm:w-1/2 md:w-1/2 p-12'>
        <DebtorCreditor />
      </motion.div>
    </motion.div>
  );
}

export default HomeTab;
