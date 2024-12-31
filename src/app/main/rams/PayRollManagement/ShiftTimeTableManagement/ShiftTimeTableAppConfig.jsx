import { Navigate } from "react-router-dom";
import ShiftTimeTableApp from "./ShiftTimeTableApp";
import ShiftTimeTables from "./shiftTimeTables/ShiftTimeTables";
import ShiftTimeTable from "./shiftTimeTable/ShiftTimeTable";

// apps/shiftTimeTable/shiftTimeTables

const ShiftTimeTableAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/shiftTimeTable",
      element: <ShiftTimeTableApp />,
      children: [
        {
          path: "",
          element: <Navigate to="shiftTimeTables" />,
        },
        {
          path: "shiftTimeTables",
          element: <ShiftTimeTables />,
        },
        {
          path: "shiftTimeTables/:shiftTimeTableId/*",
          element: <ShiftTimeTable />,
        },
      ],
    },
  ],
};
export default ShiftTimeTableAppConfig;
