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
    <div className="w-full flex justify-center items-center">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
    className="w-full max-w-[500px] px-4" // you can adjust max width if needed
  >
    <img
      src="/assets/images/logos/bbit.png"
      alt="Logo"
      className="w-full h-auto object-contain"
    />
  </motion.div>
</div>

  );
}

export default HomeTab;
