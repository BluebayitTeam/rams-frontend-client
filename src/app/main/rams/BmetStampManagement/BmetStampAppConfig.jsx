import { Navigate } from "react-router-dom";
import BmetStampApp from "./BmetStampApp";
import BmetStamps from "./bmetStamps/BmetStamps";
import BmetStamp from "./bmetStamp/BmetStamp";

const BmetStampAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/bmetStamp",
      element: <BmetStampApp />,
      children: [
        {
          path: "",
          element: <Navigate to="bmetStamps" />,
        },
        {
          path: "bmetStamps",
          element: <BmetStamps />,
        },
        {
          path: "bmetStamps/:bmetStampId/*",
          element: <BmetStamp />,
        },
      ],
    },
  ],
};
export default BmetStampAppConfig;
