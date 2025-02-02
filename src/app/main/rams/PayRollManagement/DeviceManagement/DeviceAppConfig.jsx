import { Navigate } from 'react-router-dom';
import Device from './device/Device';
import DeviceApp from './DeviceApp';
import Devices from './devices/Devices';

/**
 * The E-Commerce app configuration.
 */

// apps/device/devices

const DeviceAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/device',
      element: <DeviceApp />,
      children: [
        {
          path: '',
          element: <Navigate to='devices' />,
        },
        {
          path: 'devices',
          element: <Devices />,
        },
        {
          path: 'devices/:deviceId/*',
          element: <Device />,
        },
      ],
    },
  ],
};
export default DeviceAppConfig;
