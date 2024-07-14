import { Outlet } from 'react-router';
import withReducer from 'app/store/withReducer';
import reducer from './store';

function MakeListColumnApp() {
  return <Outlet />;
}

export default withReducer('makeListColumnApp', reducer)(MakeListColumnApp);
