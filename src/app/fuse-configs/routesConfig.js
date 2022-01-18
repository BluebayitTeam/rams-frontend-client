import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import ramsRouteConfig from 'app/main/rams/ramsRouteConfig';

const routeConfigs = [
	ExampleConfig,
	LoginConfig,
	ramsRouteConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	// {
	// 	path: '/',
	// 	exact: true,
	// 	component: () => <Redirect to="/login" />
	// }
];

export default routes;
