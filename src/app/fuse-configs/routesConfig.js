import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import Error404PageConfig from 'app/main/pages/errors/404/Error404PageConfig';
import ramsRouteConfig from 'app/main/rams/ramsRouteConfig';

const routeConfigs = [Error404PageConfig, ExampleConfig, LoginConfig, ramsRouteConfig];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs)
	// {
	// 	path: '/',
	// 	exact: true,
	// 	component: () => <Redirect to="/login" />
	// }
];

export default routes;
