import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function InterviewedMalaysiaReportApp() {
  return <Outlet />;
}

export default withReducer(
  'interviewedMalaysiaReportApp',
  reducer
)(InterviewedMalaysiaReportApp);
