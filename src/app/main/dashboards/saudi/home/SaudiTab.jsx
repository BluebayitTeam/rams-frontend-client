import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import OnProcess from '../AllCartDashboard/OnProcess';
import { selectWidget } from '../SaudiDashboardApi';
import MedicalExpired from '../AllCartDashboard/MedicalExpired';
import VisaExpired from '../AllCartDashboard/VisaExpired';
import PendingAttachment from '../AllCartDashboard/PendingAttachment';
import Registered from '../AllCartDashboard/Registered';
import MedicalDone from '../AllCartDashboard/MedicalDone';
import Musaned from '../AllCartDashboard/Musaned';
import Mofa from '../AllCartDashboard/Mofa';
import Okala from '../AllCartDashboard/Okala';
import Embassy from '../AllCartDashboard/Embassy';
import Training from '../AllCartDashboard/Training';
import ManPower from '../AllCartDashboard/ManPower';
import FlightWaiting from '../AllCartDashboard/FlightWaiting';
import FlightDone from '../AllCartDashboard/FlightDone';

function SaudiTab() {
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
        <OnProcess />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <MedicalExpired />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <VisaExpired />
      </motion.div>{' '}
      {/* <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <PendingAttachment />
      </motion.div>{' '} */}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Registered />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <MedicalDone />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Musaned />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Mofa />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Okala />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Embassy />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Training />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <ManPower />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <FlightWaiting />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <FlightDone />
      </motion.div>
    </motion.div>
  );
}

export default SaudiTab;
