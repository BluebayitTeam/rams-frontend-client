import withReducer from 'app/store/withReducer';
import { Outlet } from 'react-router';
import reducer from './store';

function CandidateApplicationApp() {
  return <Outlet />;
}

export default withReducer(
  'CandidateApplicationApp',
  reducer
)(CandidateApplicationApp);
