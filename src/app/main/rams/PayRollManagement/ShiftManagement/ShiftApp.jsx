import { Outlet } from "react-router";
import withReducer from "app/store/withReducer";
import reducer from "./store";

function ShiftApp() {
  return <Outlet />;
}

export default withReducer("shiftApp", reducer)(ShiftApp);
