import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function EmbassyReportApp() {
  return <Outlet />;
}

export default withReducer('embassyReportApp', reducer)(EmbassyReportApp);
