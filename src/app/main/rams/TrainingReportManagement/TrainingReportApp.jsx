import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function TrainingReportApp() {
  return <Outlet />;
}

export default withReducer('trainingReportApp', reducer)(TrainingReportApp);
