import { motion } from 'framer-motion';
import { selectWidget } from '../../ProjectDashboardApi';
import UpcomingMedical from './widgets/UpcomingMedical';
import { useSelector } from 'react-redux';
import UpcomingVisa from './widgets/UpcomingVisa';
import UpcomingEVisa from './widgets/UpcomingEVisa';
import UpcomingEmbassy from './widgets/UpcomingEmbassy';
import NotMedical from './widgets/NotMedical';
import Fit from './widgets/Fit';
import UnFit from './widgets/UnFit';
import Visits from './widgets/Visits';
import Visa from './widgets/Visa';
import Manpower from './widgets/Manpower';
import FlightWaiting from './widgets/FlightWaiting';
import FlightDone from './widgets/FlightDone';
import FlightChart from './widgets/FlightChart';
import LatestFlight from './widgets/LatestFlight';
import StatusSummary from './widgets/StatusSummary';

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
      </motion.div>{' '}
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
        <UpcomingEVisa />
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
      </motion.div>
    </motion.div>
  );
}

export default HomeTab;
