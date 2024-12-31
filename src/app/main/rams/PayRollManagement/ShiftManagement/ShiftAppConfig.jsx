import { Navigate } from "react-router-dom";
import ShiftApp from "./ShiftApp";
import Shifts from "./Shifts/Shifts";
import Shift from "./shift/Shift";

// apps/shift/shifts

const ShiftAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/shift",
      element: <ShiftApp />,
      children: [
        {
          path: "",
          element: <Navigate to="shifts" />,
        },
        {
          path: "shifts",
          element: <Shifts />,
        },
        {
          path: "shifts/:shiftId/*",
          element: <Shift />,
        },
      ],
    },
  ],
};
export default ShiftAppConfig;
