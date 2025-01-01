import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectWidget } from '../MalaysiaDashboardApi';
import MedicalExpired from '../AllCartDashboard/MedicalExpired';
import OnProcess from '../AllCartDashboard/OnProcess';
import VisaExpired from '../AllCartDashboard/VisaExpired';
import PendingAttachment from '../AllCartDashboard/PendingAttachment';
import Registered from '../AllCartDashboard/Registered';
import MedicalDone from '../AllCartDashboard/MedicalDone';
import Interviewed from '../AllCartDashboard/Interviewed';
import VisaAdvise from '../AllCartDashboard/VisaAdvise';
import SubmittedForSev from '../AllCartDashboard/SubmittedForSev';
import SevReceived from '../AllCartDashboard/SevReceived';
import SubmittedForPermissionImmigrationClearance from '../AllCartDashboard/SubmittedForPermissionImmigrationClearance';
import ImmigrationClearance from '../AllCartDashboard/ImmigrationClearance';
import FlightConfirmation from '../AllCartDashboard/FlightConfirmation';
import Ticket from '../AllCartDashboard/Ticket';
import AccountsCleared from '../AllCartDashboard/AccountsCleared';
import OrientationTraining from '../AllCartDashboard/OrientationTraining';

function MalaysiaTab() {
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
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <PendingAttachment />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Registered />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Interviewed />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <MedicalDone />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <VisaAdvise />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <SubmittedForSev />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <SevReceived />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <SubmittedForPermissionImmigrationClearance />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <ImmigrationClearance />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <FlightConfirmation />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <Ticket />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <AccountsCleared />
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <OrientationTraining />
      </motion.div>
    </motion.div>
  );
}

export default MalaysiaTab;
