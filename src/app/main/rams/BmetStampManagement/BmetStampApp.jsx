import { Outlet } from "react-router";
import withReducer from "app/store/withReducer";
import reducer from "./store";

function BmetStampApp() {
  return <Outlet />;
}

export default withReducer("BmetStampApp", reducer)(BmetStampApp);
