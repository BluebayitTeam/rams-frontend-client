import { motion } from 'framer-motion';
import SummaryWidget from './widgets/SummaryWidget';
import OverdueWidget from './widgets/OverdueWidget';
import IssuesWidget from './widgets/IssuesWidget';
import FeaturesWidget from './widgets/FeaturesWidget';
import GithubIssuesWidget from './widgets/GithubIssuesWidget';
import TaskDistributionWidget from './widgets/TaskDistributionWidget';
import ScheduleWidget from './widgets/ScheduleWidget';
import { useSelector } from 'react-redux';
import { selectWidget } from '../../ProjectDashboardApi';

/**
 * The HomeTab component.
 */
function HomeTab() {
  const widget = useSelector(selectWidget);

  console.log('widget', widget);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24'
      variants={container}
      initial='hidden'
      animate='show'>
      <motion.div variants={item} className='widget flex w-full'>
        <h1 className='font-700 mx-20 text-blue-800'>Expire Status</h1>
      </motion.div>{' '}
      <motion.div
        variants={item}
        className='widget flex w-full sm:w-1/2 md:w-1/4 p-12'>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <SummaryWidget />
      </motion.div>
      <motion.div variants={item}>
        <OverdueWidget />
      </motion.div>
      <motion.div variants={item}>
        <IssuesWidget />
      </motion.div>
      <motion.div variants={item}>
        <FeaturesWidget />
      </motion.div>
      <motion.div variants={item} className='sm:col-span-2 md:col-span-4'>
        <GithubIssuesWidget />
      </motion.div>
      <motion.div
        variants={item}
        className='sm:col-span-2 md:col-span-4 lg:col-span-2'>
        <TaskDistributionWidget />
      </motion.div>
      <motion.div
        variants={item}
        className='sm:col-span-2 md:col-span-4 lg:col-span-2'>
        <ScheduleWidget />
      </motion.div>
    </motion.div>
  );
}

export default HomeTab;
