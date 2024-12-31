import { Outlet } from "react-router";
import withReducer from "app/store/withReducer";
import reducer from "./store";

function ShiftTimeTableApp() {
  return <Outlet />;
}

export default withReducer("shiftTimeTableApp", reducer)(ShiftTimeTableApp);
