import { motion } from 'framer-motion';
import { selectWidget } from '../../SaudiDashboardApi';
import { useSelector } from 'react-redux';
import TotalSaudi from '../../../saudi/tabs/home/widgets/TotalSaudi';

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
        <TotalSaudi />
      </motion.div>
    </motion.div>
  );
}

export default SaudiTab;
