import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import PagesConfigs from '../main/pages/pagesConfigs';
import DashboardsConfigs from '../main/dashboards/dashboardsConfigs';
import AppsConfigs from '../main/apps/appsConfigs';
import UserInterfaceConfigs from '../main/user-interface/UserInterfaceConfigs';
import authRoleExamplesConfigs from '../main/auth/authRoleExamplesConfigs';
import ProjectDashboardApp from '../main/dashboards/project/ProjectDashboardApp';

const routeConfigs = [
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ...PagesConfigs,
  ...UserInterfaceConfigs,
  ...DashboardsConfigs,
  ...AppsConfigs,
  ...authRoleExamplesConfigs,
];
/**
 * The routes of the application.
 */
const routes = [
  ...FuseUtils.generateRoutesFromConfigs(
    routeConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: '/dashboards/project',
    element: <ProjectDashboardApp />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: '/',
    element: <Navigate to='/dashboards/project' />,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to='404' />,
  },
];
export default routes;
