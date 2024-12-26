import { motion } from 'framer-motion';
import { selectWidget } from '../../ProjectDashboardApi';
import UpcomingMedical from './widgets/UpcomingMedical';
import { useSelector } from 'react-redux';
import UpcomingVisa from './widgets/UpcomingVisa';
import UpcomingEVisa from './widgets/UpcomingEVisa';
import UpcomingEmbassy from './widgets/UpcomingEmbassy';

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
        <UpcomingMedical widget={widgets.upcomingMedical} />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingVisa widget={widgets.upcomingVisa} />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingEVisa widget={widgets.upcomingEvisa} />
      </motion.div>
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <UpcomingEmbassy widget={widgets.upcomingEmbassy} />
      </motion.div>
    </motion.div>
  );
}

export default HomeTab;
