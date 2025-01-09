import { Navigate } from "react-router-dom";
import ShiftTimeTable from "./shiftTimeTable/ShiftTimeTable";
import ShiftTimeTableApp from "./ShiftTimeTableApp";
import ShiftTimeTables from "./shiftTimeTables/ShiftTimeTables";

// apps/timetables-management/timetables

const ShiftTimeTableAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/timetables-management",
      element: <ShiftTimeTableApp />,
      children: [
        {
          path: "",
          element: <Navigate to="timetables" />,
        },
        {
          path: "timetables",
          element: <ShiftTimeTables />,
        },
        {
          path: "timetables/:shiftTimeTableId/*",
          element: <ShiftTimeTable />,
        },
      ],
    },
  ],
};
export default ShiftTimeTableAppConfig;
