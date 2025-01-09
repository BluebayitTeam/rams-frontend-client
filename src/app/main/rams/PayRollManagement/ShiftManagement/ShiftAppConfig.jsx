import { Navigate } from "react-router-dom";
import ShiftApp from "./ShiftApp";
import Shifts from "./Shifts/Shifts";
import Shift from "./shift/Shift";

// apps/shifts-management/shifts

const ShiftAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/shifts-management",
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
